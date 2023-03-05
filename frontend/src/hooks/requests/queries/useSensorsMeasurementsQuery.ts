import { useQuery } from 'react-query';
import {
  FindManySensorMeasurementsResponseDTO,
  FindSensorMeasurementsDTO,
} from 'types/shared';
import { customFetch } from 'tools';

export function useSensorsMeasurementsData(
  searchOptions: FindSensorMeasurementsDTO,
) {
  const { isLoading, isError, isSuccess, data } = useQuery(
    [
      'sensor_measurements',
      searchOptions.reservoirId,
      searchOptions.minDate,
      searchOptions.maxDate,
    ] as [string, number, Date | undefined, Date | undefined],
    ({ queryKey: [, reservoirId, minDate, maxDate] }) =>
      customFetch('sensorMeasurement/findMany', {
        needsJsonResponseBodyParsing: true,
        method: 'POST',
        needsAccessToken: true,
        body: {
          reservoirId,
          minDate,
          maxDate,
        },
        requestDTOclass: FindSensorMeasurementsDTO,
        responseDTOclass: FindManySensorMeasurementsResponseDTO,
      }),
  );
  return {
    isLoading,
    isError,
    isSuccess,
    sensorMeasurements: data?.sensorMeasurements,
  };
}
