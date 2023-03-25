import { IsPositive } from 'class-validator';
import { NestedArrayDTO } from '../../../../../tools/shared';

export class GetOneTaskToReservoirByIdResponseDTO {
  @IsPositive()
  taskId!: number;

  @IsPositive()
  reservoirId!: number;

  @IsPositive()
  userId!: number;
}

export class FindManyTaskToReservoirsResponseDTO {
  @NestedArrayDTO(() => GetOneTaskToReservoirByIdResponseDTO)
  taskToReservoirs!: GetOneTaskToReservoirByIdResponseDTO[];
}
