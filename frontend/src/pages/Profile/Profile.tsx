import { useSensorsMeasurementsData } from 'hooks';
import { useFishRecognitionVideoStream } from './hooks';
import {
  MainWrapper,
  SensorMeasurementPlot,
  VideoBox,
  VideoBoxWrapper,
  LiveSensorValuesCardGrid,
} from './components';

export function Profile() {
  const { isSuccess, sensorMeasurements } = useSensorsMeasurementsData({});
  const { refOfVideoElement } = useFishRecognitionVideoStream();

  // eslint-disable-next-line no-console
  if (isSuccess) console.log('sensorMeasurements: ', sensorMeasurements);

  if (!isSuccess || !sensorMeasurements) return <div>wait</div>;
  const tempMeasurements = sensorMeasurements.filter(
    ({ sensorCodeName }) => sensorCodeName === 'Temp',
  );
  const o2Measurements = sensorMeasurements
    .filter(({ sensorCodeName }) => sensorCodeName === 'O2')
    .map((meauserement) => ({
      ...meauserement,
      value: meauserement.value * 100,
    }));

  return (
    <MainWrapper>
      <VideoBoxWrapper>
        <VideoBox autoPlay playsInline ref={refOfVideoElement} />
      </VideoBoxWrapper>
      <SensorMeasurementPlot
        title="Кислород (%)"
        measurementsByOneSensor={o2Measurements}
        color="blue"
        min={80}
        max={120}
      />
      <LiveSensorValuesCardGrid />
      <SensorMeasurementPlot
        title="Температура (°C)"
        color="red"
        min={18}
        max={23}
        measurementsByOneSensor={tempMeasurements}
      />
    </MainWrapper>
  );
}
