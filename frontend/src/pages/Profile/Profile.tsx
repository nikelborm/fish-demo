/* eslint-disable jsx-a11y/media-has-caption */
import { useReservoirInfo, useSensorsMeasurementsData } from 'hooks';
import { useParams } from 'react-router';
import { remapToIndexedObject } from 'tools';
import { SensorParameterInstanceInReservoir } from 'types';
// import { useFishRecognitionVideoStream } from './hooks';
import {
  LiveSensorValuesCardGrid,
  MainWrapper,
  SensorMeasurementPlot,
} from './components';

export function Profile() {
  const reservoirId = parseInt(useParams().reservoirId ?? '0', 10);

  const { isSuccess, sensorMeasurements } = useSensorsMeasurementsData({
    reservoirId,
  });

  const { reservoir } = useReservoirInfo(reservoirId);
  if (!reservoir) return <div>wait</div>;

  const abstractSensorsMentionedInReservoir = remapToIndexedObject(
    reservoir.sensorInstances.map(
      ({
        abstractSensorToSensorInstance: {
          abstractSensor,
          sensorParameterInstances,
        },
      }) => ({
        ...abstractSensor,
        sensorParameters: sensorParameterInstances.map(
          ({ sensorParameter }) => sensorParameter,
        ),
      }),
    ),
  );

  console.log(abstractSensorsMentionedInReservoir);
  const mappedSensorParameterInstanceMap: Record<
    number,
    SensorParameterInstanceInReservoir
  > = remapToIndexedObject(
    reservoir.sensorInstances.flatMap(
      ({ abstractSensorToSensorInstance: { sensorParameterInstances } }) =>
        sensorParameterInstances,
    ),
  );

  console.log('reservoir: ', reservoir);

  console.log('sensorMeasurements: ', sensorMeasurements);
  // const { refOfVideoElement } = useFishRecognitionVideoStream();

  // eslint-disable-next-line no-console
  if (isSuccess) console.log('sensorMeasurements: ', sensorMeasurements);

  if (!isSuccess || !sensorMeasurements) return <div>wait</div>;
  const tempMeasurements = sensorMeasurements.filter(
    ({ sensorParameterInstanceId }) => sensorParameterInstanceId === 1,
  );

  const o2Measurements = sensorMeasurements
    .filter(({ sensorParameterInstanceId }) => sensorParameterInstanceId === 2)
    .map((measurement) => ({
      ...measurement,
      value: +measurement.value,
    }));

  return (
    <MainWrapper>
      <div
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          gridArea: '1 / 1 / 2 / 2',
          display: 'flex',
        }}
      >
        <iframe
          src="http://myrena-fish.ru:8889/recoded/"
          title="realtime video"
          style={{
            margin: '0 auto',
            // aspectRatio: '795/720',
            aspectRatio: '1280/720',
            border: 'none',
            // gridArea: '1 / 1 / 2 / 2',
          }}
        />
        {/* <video
          loop
          autoPlay
          src="/video.mp4"

        /> */}
      </div>
      <SensorMeasurementPlot
        id="o2plot"
        title="Кислород (%)"
        measurementsByOneSensor={o2Measurements}
        color="#053565"
        min={80}
        max={120}
      />
      <LiveSensorValuesCardGrid
        reservoirId={reservoirId}
        abstractSensorsMentionedInReservoir={
          abstractSensorsMentionedInReservoir
        }
      />
      <SensorMeasurementPlot
        id="tempplot"
        title="Температура (°C)"
        color="red"
        min={20}
        max={40}
        measurementsByOneSensor={tempMeasurements}
      />
    </MainWrapper>
  );
}
