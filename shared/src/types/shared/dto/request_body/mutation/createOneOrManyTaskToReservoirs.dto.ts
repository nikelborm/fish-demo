import { IsPositive } from 'class-validator';
import { NestedArrayDTO } from '../../../../../tools/shared';

export class CreateOneTaskToReservoirRequestDTO {
  @IsPositive()
  taskId!: number;

  @IsPositive()
  reservoirId!: number;

  @IsPositive()
  userId!: number;
}

export class CreateManyTaskToReservoirsRequestDTO {
  @NestedArrayDTO(() => CreateOneTaskToReservoirRequestDTO)
  taskToReservoirs!: CreateOneTaskToReservoirRequestDTO[];
}
