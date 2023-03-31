import { IsPositive } from 'class-validator';
import { NestedArrayDTO } from '../../../../../tools/shared';

export class CreateOneTaskToReservoirResponseDTO {
  @IsPositive()
  taskId!: number;

  @IsPositive()
  reservoirId!: number;

  @IsPositive()
  userId!: number;
}

export class CreateManyTaskToReservoirsResponseDTO {
  @NestedArrayDTO(() => CreateOneTaskToReservoirResponseDTO)
  createdTaskToReservoirs!: CreateOneTaskToReservoirResponseDTO[];
}
