import { useSensorsMeasurementsData } from 'hooks';
import { useState } from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';
import { ISensorMeasurement } from 'types';
import { getWsMessageValidator, useSocket } from 'utils';

export function Profile() {
  const { isSuccess, sensorMeasurements } = useSensorsMeasurementsData({});

  const { getLatestMeasurementsFor, setNewLatestMeasurements } =
    useLatestMeasurements();

  const validateAndTransformMeasurement =
    getWsMessageValidator(ISensorMeasurement);

  useSocket({
    namespace: '/sensorMeasurement',
    handlers: {
      many: (messages) =>
        setNewLatestMeasurements(messages.map(validateAndTransformMeasurement)),
      latest: (messages) =>
        setNewLatestMeasurements(messages.map(validateAndTransformMeasurement)),
      one: (message) =>
        setNewLatestMeasurements([validateAndTransformMeasurement(message)]),
    },
  });

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
    <MainWrapper>
      <VideoBox />
      <SuperPlot
        title="Кислород моль на литр"
        measurementsByOneSensor={o2Measurements}
        color="blue"
      />
      <RealTimeSensorGrid>
        <RealTimeSensorInfo invert>
          <RealTimeSensorName>°C</RealTimeSensorName>
          <RealTimeSensorValue>
            {parseFloat(
              parseFloat(
                getLatestMeasurementsFor('Temp')?.value || '0',
              ).toFixed(2),
            )}
          </RealTimeSensorValue>
        </RealTimeSensorInfo>
        <RealTimeSensorInfo>
          <RealTimeSensorName>
            O<sub>2</sub>
          </RealTimeSensorName>
          <RealTimeSensorValue>
            {parseFloat(
              parseFloat(getLatestMeasurementsFor('O2')?.value || '0').toFixed(
                2,
              ),
            )}
          </RealTimeSensorValue>
        </RealTimeSensorInfo>
        <RealTimeSensorInfo invert>
          <RealTimeSensorName>Ph</RealTimeSensorName>
          <RealTimeSensorValue>
            {parseFloat(
              parseFloat(getLatestMeasurementsFor('Ph')?.value || '0').toFixed(
                2,
              ),
            )}
          </RealTimeSensorValue>
        </RealTimeSensorInfo>
        <BehavioralInfo>
          Тип поведения:{' '}
          {getLatestMeasurementsFor('behavior')?.value || 'Норма'}
        </BehavioralInfo>
      </RealTimeSensorGrid>
      <SuperPlot
        title="Температура oC"
        color="red"
        measurementsByOneSensor={tempMeasurements}
      />
    </MainWrapper>
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

const RealTimeSensorGrid = styled.div`
  display: grid;
  width: 100%;
  gap: 20px;
  place-items: center center;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 2fr 1fr;
`;

const RealTimeSensorInfo = styled.div<{ invert?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  border-radius: 15px;
  width: 140px;
  height: 180px;
  color: ${(props) => (props.invert ? 'white' : '#5aa7ff')};
  background-color: ${(props) => (!props.invert ? 'white' : '#5aa7ff')};
  font-weight: 700;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
`;

const BehavioralInfo = styled.div<{ invert?: boolean }>`
  display: grid;
  place-items: center;
  border-radius: 15px;
  width: 500px;
  height: 60px;
  grid-column: 1 / 4;
  font-size: 26px;
  color: ${(props) => (props.invert ? 'white' : '#5aa7ff')};
  background-color: ${(props) => (!props.invert ? 'white' : '#5aa7ff')};
  font-weight: 700;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
`;

const RealTimeSensorName = styled.div`
  padding-left: 15px;
  padding-top: 15px;
  font-size: 20px;
`;

const RealTimeSensorValue = styled.div`
  place-items: center;
  height: 100%;
  display: grid;
  align-items: center;
  font-size: 42px;
`;

const VideoBox = styled.div`
  background-color: black;
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

const MainWrapper = styled.div`
  /* background-color: gray; */
  height: 100%;
  overflow-y: hidden;
  display: grid;
  grid-gap: 30px;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
`;
