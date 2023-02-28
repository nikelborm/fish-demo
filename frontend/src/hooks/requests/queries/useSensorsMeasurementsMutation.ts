/* eslint-disable max-classes-per-file */
import { useQuery } from 'react-query';
import { customFetch } from 'utils';
import { FindManySensorMeasurementsResponseDTO } from 'types/shared/dto/response_body/query/findManySensorMeasurements.dto';
import { FindSensorMeasurementsDTO } from 'types/shared/dto/request_body/query/findSensorMeasurements.dto';

export function useSensorsMeasurementsData(
  searchOptions: FindSensorMeasurementsDTO,
) {
  const { isLoading, isError, isSuccess, data } = useQuery(
    [
      'sensor_measurements',
      searchOptions.sensorCodeName,
      searchOptions.minDate,
      searchOptions.maxDate,
    ] as [string, string | undefined, Date | undefined, Date | undefined],
    ({ queryKey: [, sensorCodeName, minDate, maxDate] }) =>
      customFetch('sensorMeasurement/findMany', {
        needsJsonResponseBodyParsing: true,
        method: 'POST',
        needsAccessToken: true,
        body: {
          sensorCodeName,
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
