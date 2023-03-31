import { IsPositive } from 'class-validator';

export class DeleteOneTaskToReservoirRequestDTO {
  @IsPositive()
  taskId!: number;

  @IsPositive()
  reservoirId!: number;
}
