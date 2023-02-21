/* eslint-disable max-classes-per-file */
import { useQuery } from 'react-query';
import { plainToClass } from 'class-transformer';
import { customFetch, validate } from 'utils';
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
      validate({ sensorCodeName, minDate, maxDate }, FindSensorMeasurementsDTO)
        .length
        ? Promise.reject(new Error('Validation error'))
        : customFetch<FindManySensorMeasurementsResponseDTO>(
            'sensorMeasurement/findMany',
            {
              method: 'POST',
              needsAccessToken: true,
              body: searchOptions,
            },
          ).then((d) => plainToClass(FindManySensorMeasurementsResponseDTO, d)),
  );
  return {
    isLoading,
    isError,
    isSuccess,
    sensorMeasurements: data?.sensorMeasurements,
  };
}
