import Plot from 'react-plotly.js';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useSensorsMeasurementsData } from 'hooks';

export function Profile() {
  const asd = useParams();
  // eslint-disable-next-line no-console
  console.log('Profile useParams: ', asd);
  const { isError, isLoading, isSuccess, sensorMeasurements } =
    useSensorsMeasurementsData({});
  console.log(
    'isError, isLoading, isSuccess, sensorMeasurements: ',
    isError,
    isLoading,
    isSuccess,
    sensorMeasurements,
  );
  if (!isSuccess || !sensorMeasurements) return <div>wait</div>;
  const tempMeasurements = sensorMeasurements.filter(
    ({ sensorCodeName }) => sensorCodeName === 'Temp',
  );
  const o2Measurements = sensorMeasurements.filter(
    ({ sensorCodeName }) => sensorCodeName === 'O2',
  );

  return (
    <div>
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

function unpack(rows, key) {
  return rows.map(function (row) {
    return row[key];
  });
}
