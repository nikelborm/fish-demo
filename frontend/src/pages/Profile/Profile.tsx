/* eslint-disable jsx-a11y/media-has-caption */
import { useReservoirInfo, useSensorsMeasurementsData } from 'hooks';
import { useParams } from 'react-router';
import { remapToIndexedObject } from 'tools';
import { SensorParameterInstanceInReservoir } from 'types';
// import { useFishRecognitionVideoStream } from './hooks';
import { dashboard } from 'assets';
import { LiveSensorValuesCardGrid, MainWrapper } from './components';

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
      value: +measurement.value * 100,
    }));

  return (
    <MainWrapper>
      <video
        loop
        autoPlay
        src="/IPCAM_2023-01-30-15-25-53.mp4"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          gridArea: '1 / 1 / 2 / 2',
        }}
      />
      {/* <div style={{ backgroundColor: 'red' }}>asd</div> */}

      <img
        src={dashboard}
        alt="dashboard"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          gridArea: '1 / 2 / 3 / 3',
        }}
        title="superset experiment"
        // src="http://81.200.147.139:8088/superset/dashboard/p/M5yWz7EGoa4/"
      />
      {/* <SensorMeasurementPlot
        title="Кислород (%)"
        measurementsByOneSensor={o2Measurements}
        color="blue"
        min={80}
        max={120}
      /> */}
      <LiveSensorValuesCardGrid
        reservoirId={reservoirId}
        abstractSensorsMentionedInReservoir={
          abstractSensorsMentionedInReservoir
        }
      />
      {/* <SensorMeasurementPlot
        title="Температура (°C)"
        color="red"
        min={20}
        max={40}
        measurementsByOneSensor={tempMeasurements}
      /> */}
    </MainWrapper>
  );
}
