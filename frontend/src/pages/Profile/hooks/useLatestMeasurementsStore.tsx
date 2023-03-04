import { useState } from 'react';
import { ISensorMeasurement } from 'types';

export function useLatestMeasurementsStore() {
  const [latestMeasurements, setLatestMeasurementsState] = useState<
    Map<string, ISensorMeasurement>
  >(new Map());

  return {
    getLatestMeasurementsFor(sensorName: string) {
      return latestMeasurements.get(sensorName);
    },
    setNewLatestMeasurements(candidates: ISensorMeasurement[]) {
      let hasChanged = false;
      candidates.forEach((v) => {
        const currentLatestDate = latestMeasurements.get(
          v.sensorCodeName,
        )?.date;
        // eslint-disable-next-line prettier/prettier
        if (!currentLatestDate || (currentLatestDate < v.date)) {
          latestMeasurements.set(v.sensorCodeName, v);
          hasChanged = true;
        }
      });
      if (hasChanged) {
        setLatestMeasurementsState(new Map(latestMeasurements));
      }
    },
  };
}
