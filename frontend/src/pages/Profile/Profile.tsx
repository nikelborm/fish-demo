import { useReservoirInfo, useSensorsMeasurementsData } from 'hooks';
import { useParams } from 'react-router';
import { useFishRecognitionVideoStream } from './hooks';
import {
  MainWrapper,
  SensorMeasurementPlot,
  VideoBox,
  VideoBoxWrapper,
  LiveSensorValuesCardGrid,
} from './components';

export function Profile() {
  const asd = useParams();
  console.log('asd: ', asd);

  const reservoirId = 1;
  const { isSuccess, sensorMeasurements } = useSensorsMeasurementsData({
    reservoirId,
  });
  const asd2 = useReservoirInfo(reservoirId);
  console.log('asd2: ', asd2);
  console.log('sensorMeasurements: ', sensorMeasurements);
  const { refOfVideoElement } = useFishRecognitionVideoStream();

  // eslint-disable-next-line no-console
  if (isSuccess) console.log('sensorMeasurements: ', sensorMeasurements);

  if (!isSuccess || !sensorMeasurements) return <div>wait</div>;
  const tempMeasurements = sensorMeasurements.filter(
    ({ sensorParameterInstanceId }) => sensorParameterInstanceId === 1,
  );

  const o2Measurements = sensorMeasurements
    .filter(({ sensorParameterInstanceId }) => sensorParameterInstanceId === 1)
    .map((measurement) => ({
      ...measurement,
      value: +measurement.value * 100,
    }));

  return (
    <MainWrapper>
      {/* <VideoBoxWrapper>
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
      /> */}
    </MainWrapper>
  );
}
