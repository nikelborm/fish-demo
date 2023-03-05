import { useState } from 'react';
import { ISensorMeasurement } from 'types';

export function useLatestMeasurementsStore() {
  const [latestMeasurements, setLatestMeasurementsState] = useState<
    Map<number, ISensorMeasurement>
  >(new Map());

  return {
    getLatestMeasurementsFor(sensorParameterInstanceId: number) {
      return latestMeasurements.get(sensorParameterInstanceId);
    },
    setNewLatestMeasurements(candidates: ISensorMeasurement[]) {
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
