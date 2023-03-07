import { useState } from 'react';
import { FlatSensorMeasurement } from 'types';

export function useLatestMeasurementsStore() {
  const [latestMeasurements, setLatestMeasurementsState] = useState<
    Map<number, FlatSensorMeasurement>
  >(new Map());

  return {
    getLatestMeasurementsFor(sensorParameterInstanceId: number) {
      return latestMeasurements.get(sensorParameterInstanceId);
    },
    setNewLatestMeasurements(candidates: FlatSensorMeasurement[]) {
      let hasChanged = false;
      candidates.forEach((v) => {
        const currentLatestDate = latestMeasurements.get(
          v.sensorParameterInstanceId,
        )?.recordedAt;
        // eslint-disable-next-line prettier/prettier
        if (!currentLatestDate || (currentLatestDate < v.recordedAt)) {
          latestMeasurements.set(v.sensorParameterInstanceId, v);
          hasChanged = true;
        }
      });
      if (hasChanged) {
        setLatestMeasurementsState(new Map(latestMeasurements));
      }
    },
  };
}
