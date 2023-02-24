import Plot from 'react-plotly.js';
import styled from 'styled-components';
import { useSensorsMeasurementsData } from 'hooks';
import { validate } from 'utils';
import { useEffect, useState } from 'react';
import { Manager } from 'socket.io-client';
import { ISensorMeasurement } from 'types';

const manager = new Manager({
  transports: ['websocket', 'polling'],
  path: '/api/ws',
  autoConnect: false,
});

export function Profile() {
  const { isSuccess, sensorMeasurements } = useSensorsMeasurementsData({});
  const { getLatestMeasurementsFor, setNewLatestMeasurements } =
    useLatestMeasurements();
  const validateAndTransformMeasurement =
    getWsMessageValidator(ISensorMeasurement);
  const socket = manager.socket('/sensorMeasurement', {
    auth: {
      token: '123',
    },
  });

  useEffect(() => {
    socket.on('connect', () => {});

    socket.on('disconnect', () => {});

    socket.on('many', (messages: any[]) =>
      setNewLatestMeasurements(messages.map(validateAndTransformMeasurement)),
    );
    socket.on('latest', (messages: any[]) =>
      setNewLatestMeasurements(messages.map(validateAndTransformMeasurement)),
    );
    socket.on('one', (message) =>
      setNewLatestMeasurements([validateAndTransformMeasurement(message)]),
    );

    socket.on('exception', (backendError) => {
      // eslint-disable-next-line no-console
      console.error('error: ', backendError);
    });

    socket.connect();
    return () => {
      // do not forget to off every new socket.on event handlers
      socket.off('connect');
      socket.off('disconnect');
      socket.off('many');
      socket.off('latest');
      socket.off('one');
      socket.off('exception');
    };
  }, []);

  // eslint-disable-next-line no-console
  if (isSuccess) console.log('sensorMeasurements: ', sensorMeasurements);

  if (!isSuccess || !sensorMeasurements) return <div>wait</div>;
  const tempMeasurements = sensorMeasurements.filter(
    ({ sensorCodeName }) => sensorCodeName === 'Temp',
  );
  const o2Measurements = sensorMeasurements.filter(
    ({ sensorCodeName }) => sensorCodeName === 'O2',
  );

  return (
    <div>
      <p>Latest value for O2 is {getLatestMeasurementsFor('O2')?.value}</p>
      <p>Latest value for Temp is {getLatestMeasurementsFor('Temp')?.value}</p>
      <SuperPlot
        title="Кислород моль на литр"
        measurementsByOneSensor={o2Measurements}
        color="blue"
      />
      <SuperPlot
        title="Температура oC"
        color="red"
        measurementsByOneSensor={tempMeasurements}
      />
    </div>
  );
}

function SuperPlot({ measurementsByOneSensor, title, color }) {
  const dates = measurementsByOneSensor.map(({ date }) => date);
  const datesNumbers = dates.map((e) => e.getTime());
  const maxDate = new Date(Math.max(...datesNumbers));
  const minDate = new Date(Math.min(...datesNumbers));
  const values = measurementsByOneSensor.map(({ value }) => parseFloat(value));
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  return (
    <Plot
      data={[
        {
          type: 'scatter',
          mode: 'lines',
          name: 'AAPL High',
          x: dates,
          y: values,
          // line: { color: '#17BECF' },
          marker: { color },
        },
      ]}
      layout={{
        title,
        xaxis: {
          // autorange: true,
          range: [minDate, maxDate],
          rangeselector: {
            buttons: [
              {
                count: 1,
                label: '1s',
                step: 'second',
                stepmode: 'backward',
              },
              {
                count: 6,
                label: '6s',
                step: 'second',
                stepmode: 'backward',
              },
              { step: 'all' },
            ],
          },
          rangeslider: { range: [minDate, maxDate] },
          type: 'date',
        },
        yaxis: {
          // autorange: true,
          range: [minValue, maxValue],
          type: 'linear',
        },
      }}
    />
  );
}

const GridWith3Columns = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  width: 100%;
  gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;
`;

const GridWith2Rows = styled.div`
  display: grid;
  grid-template-rows: 1fr 400px;
  width: 100%;
  gap: 20px;
  grid-template-columns: 1fr;
`;

function useLatestMeasurements() {
  const [latestMeasurements, setLatestMeasurementsState] = useState<
    Map<string, ISensorMeasurement>
  >(new Map());

  return {
    getLatestMeasurementsFor(sensorName: string) {
      return latestMeasurements.get(sensorName);
    },
    setNewLatestMeasurements(candidates: ISensorMeasurement[]) {
      let hasChanged = false;
      candidates.forEach((v) => {
        const currentLatestDate = latestMeasurements.get(
          v.sensorCodeName,
        )?.date;
        if (!currentLatestDate || currentLatestDate < v.date) {
          latestMeasurements.set(v.sensorCodeName, v);
          hasChanged = true;
        }
      });
      if (hasChanged) {
        setLatestMeasurementsState(new Map(latestMeasurements));
      }
    },
  };
}

function getWsMessageValidator<T>(dto: new () => T) {
  function validateWsMessage(message: any) {
    const { errors, payloadInstance } = validate<T>(message, dto);
    if (errors.length) {
      throw new Error(
        `WS incoming message validation error: ${JSON.stringify(errors)}`,
      );
    }
    return payloadInstance;
  }
  return validateWsMessage;
}
