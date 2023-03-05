import { IsNumber } from 'class-validator';

export class SubscribeToReservoirLiveSensorsDTO {
  @IsNumber()
  reservoirId!: number;
}
