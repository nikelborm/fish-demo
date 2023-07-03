import Plot from 'react-plotly.js';
import { FlatSensorMeasurement } from 'types';

export function SensorMeasurementPlot({
  measurementsByOneSensor,
  title,
  color,
  min,
  max,
}: {
  measurementsByOneSensor: FlatSensorMeasurement[];
  title: string;
  color: string;
  min?: number;
  max?: number;
}) {
  // const dates = measurementsByOneSensor.map(({ recordedAt }) => {
  //   const dateModified = new Date(recordedAt);
  //   dateModified.setHours(recordedAt.getHours() + 13);
  //   dateModified.setMinutes(recordedAt.getMinutes() + 7);
  //   // console.log('date.getHours(): ', dateModified.getHours());
  //   // console.log('dateModified: ', dateModified);
  //   return dateModified;
  // });
  const dates = measurementsByOneSensor.map(({ recordedAt }) => recordedAt);
  const datesNumbers = dates.map((e) => e.getTime());
  const maxDate = new Date(Math.max(...datesNumbers));
  const minDate = new Date(Math.min(...datesNumbers));
  const values = measurementsByOneSensor.map(({ value }) => value as number);
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
          range: [min || minValue, max || maxValue],
          type: 'linear',
        },
      }}
    />
  );
}
