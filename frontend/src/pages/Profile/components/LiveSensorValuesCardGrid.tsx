import { getWsMessageValidator, useSocket } from 'tools';
import { ISensorMeasurement } from 'types';
import { useLatestMeasurementsStore } from '../hooks';
import {
  BehavioralInfo,
  RealTimeSensorGrid,
  RealTimeSensorInfo,
  RealTimeSensorName,
  RealTimeSensorValue,
} from './styled';

export function LiveSensorValuesCardGrid() {
  const { getLatestMeasurementsFor, setNewLatestMeasurements } =
    useLatestMeasurementsStore();

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

  return (
    <RealTimeSensorGrid>
      <RealTimeSensorInfo invert>
        <RealTimeSensorName>t, °C</RealTimeSensorName>
        <RealTimeSensorValue>
          {parseFloat(
            (getLatestMeasurementsFor('Temp')?.value || 0).toFixed(2),
          )}
        </RealTimeSensorValue>
      </RealTimeSensorInfo>
      <RealTimeSensorInfo>
        <RealTimeSensorName>
          O<sub>2</sub>
        </RealTimeSensorName>
        <RealTimeSensorValue>
          {parseFloat(
            ((getLatestMeasurementsFor('O2')?.value || 0) * 100).toFixed(2),
          )}
          %
        </RealTimeSensorValue>
      </RealTimeSensorInfo>
      <RealTimeSensorInfo invert>
        <RealTimeSensorName>pH</RealTimeSensorName>
        <RealTimeSensorValue>
          {parseFloat((getLatestMeasurementsFor('pH')?.value || 0).toFixed(3))}
        </RealTimeSensorValue>
      </RealTimeSensorInfo>
      <BehavioralInfo>
        Тип поведения: {getLatestMeasurementsFor('behavior')?.value || 'Норма'}
      </BehavioralInfo>
    </RealTimeSensorGrid>
  );
}

const validateAndTransformMeasurement =
  getWsMessageValidator(ISensorMeasurement);
