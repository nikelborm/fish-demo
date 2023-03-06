import { IsNumber } from 'class-validator';

export class GetSensorMeasurementsByReservoirIdDTO {
  @IsNumber()
  reservoirId!: number;
}
