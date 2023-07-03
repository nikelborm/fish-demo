import { useCallback, useMemo } from 'react';
import { Socket } from 'socket.io-client';
import { getWsMessageValidator, useSocket } from 'tools';
import { FlatSensorMeasurement, ISensorMeasurement } from 'types';
import { useQueryClient } from 'react-query';
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
  const client = useQueryClient();

  const onConnect = useCallback(
    (socket: Socket) => {
      socket.emit('latest/byReservoir', { reservoirId });
      socket.emit('subscribe/liveSensorMeasurements/byReservoir', {
        reservoirId,
      });
    },
    [reservoirId],
  );

  const handlers = useMemo(() => {
    const reactToMeasurements = (messages: any[]) => {
      const manyNewMeasurements = messages.map(validateAndTransformMeasurement);
      setNewLatestMeasurements(manyNewMeasurements);
      client.setQueryData(
        ['sensor_measurements'],
        (old: FlatSensorMeasurement[] | undefined) => [
          ...(old || []),
          ...(manyNewMeasurements as FlatSensorMeasurement[]),
        ],
      );
    };
    return {
      many: reactToMeasurements,
      latest: reactToMeasurements,
    };
  }, [setNewLatestMeasurements, client]);

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
              {/* {
                {
                  // T: '20.5',
                  // o2: '93',
                  pH: '7.2',
                }[shortName]
              } */}
              {/* Here should be id of sensor parameter instance, not id of
              sensor parameter. It is intentional bug just for demo */}
              {shortName === 'pH'
                ? 7.2
                : parseFloat(
                    (
                      (getLatestMeasurementsFor(id)?.value as number) || 0
                    ).toFixed(2),
                  )}
            </RealTimeSensorValue>
          </RealTimeSensorInfo>
        ),
      )}

      <BehavioralInfo>
        {/* Тип поведения: {getLatestMeasurementsFor(1)?.value || 'Норма'} */}
        Тип поведения: Норма
      </BehavioralInfo>
    </RealTimeSensorGrid>
  );
}

const validateAndTransformMeasurement =
  getWsMessageValidator(ISensorMeasurement);
