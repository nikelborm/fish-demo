import { useQuery } from 'react-query';
import { FindOneReservoirByIdResponseDTO } from 'types/shared';
import { customFetch } from 'tools';

export function useReservoirInfo(reservoirId: number) {
  const { isLoading, isError, isSuccess, data } = useQuery(
    ['reservoirFullInfo', reservoirId] as [string, number],
    ({ queryKey }) =>
      customFetch(`reservoir/${queryKey[1] /* which is reservoirId */}`, {
        needsJsonResponseBodyParsing: true,
        method: 'GET',
        needsAccessToken: true,
        responseDTOclass: FindOneReservoirByIdResponseDTO,
      }),
  );
  return {
    isLoading,
    isError,
    isSuccess,
    reservoir: data?.reservoir,
  };
}
