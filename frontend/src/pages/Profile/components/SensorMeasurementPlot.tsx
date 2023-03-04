import Plot from 'react-plotly.js';

export function SensorMeasurementPlot({
  measurementsByOneSensor,
  title,
  color,
  min,
  max,
}: {
  measurementsByOneSensor: any;
  title: any;
  color: any;
  min?: number;
  max?: number;
}) {
  const dates = measurementsByOneSensor.map(({ date }) => {
    const dateModified = new Date(date);
    dateModified.setHours(date.getHours() + 13);
    dateModified.setMinutes(date.getMinutes() + 7);
    // console.log('date.getHours(): ', dateModified.getHours());
    // console.log('dateModified: ', dateModified);
    return dateModified;
  });
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
          range: [min || minValue, max || maxValue],
          type: 'linear',
        },
      }}
    />
  );
}
