import { useCallback, useMemo } from 'react';
import { Socket } from 'socket.io-client';
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

export function LiveSensorValuesCardGrid({
  reservoirId,
  abstractSensorsMentionedInReservoir,
}: {
  reservoirId: number;
  abstractSensorsMentionedInReservoir: Record<number, any>;
}) {
  const { getLatestMeasurementsFor, setNewLatestMeasurements } =
    useLatestMeasurementsStore();

  const onConnect = useCallback(
    (socket: Socket) => {
      socket.emit('latest/byReservoir', { reservoirId });
      socket.emit('subscribe/liveSensorMeasurements/byReservoir', {
        reservoirId,
      });
    },
    [reservoirId],
  );

  const handlers = useMemo(
    () => ({
      many: (messages) =>
        setNewLatestMeasurements(messages.map(validateAndTransformMeasurement)),
      latest: (messages) =>
        setNewLatestMeasurements(messages.map(validateAndTransformMeasurement)),
    }),
    [setNewLatestMeasurements],
  );

  useSocket({
    namespace: '/sensorMeasurement',
    onConnect,
    handlers,
  });

  return (
    <RealTimeSensorGrid>
      {abstractSensorsMentionedInReservoir[1].sensorParameters.map(
        ({ id, shortName, unit }) => (
          <RealTimeSensorInfo
            title={`sensor model ${abstractSensorsMentionedInReservoir[1].modelName}`}
            invert={id % 2 === 1}
            key={id}
          >
            <RealTimeSensorName>
              {shortName === 'o2' ? (
                <>
                  O<sub>2</sub>
                </>
              ) : (
                shortName
              )}
              {unit ? `, ${unit}` : ''}
            </RealTimeSensorName>
            <RealTimeSensorValue>
              {parseFloat(
                /* Here should be id of sensor parameter instance, not id of sensor parameter. It is intentional bug just for demo */
                ((getLatestMeasurementsFor(id)?.value as number) || 0).toFixed(
                  2,
                ),
              )}
            </RealTimeSensorValue>
          </RealTimeSensorInfo>
        ),
      )}

      <BehavioralInfo>
        Тип поведения: {getLatestMeasurementsFor(1)?.value || 'Норма'}
      </BehavioralInfo>
    </RealTimeSensorGrid>
  );
}

const validateAndTransformMeasurement =
  getWsMessageValidator(ISensorMeasurement);
