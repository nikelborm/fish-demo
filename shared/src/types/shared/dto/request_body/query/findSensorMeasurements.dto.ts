import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class FindSensorMeasurementsDTO {
  @IsNumber()
  reservoirId!: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  minDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  maxDate?: Date;
}
