import { Type } from 'class-transformer';
import {
  IsDate,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class FindSensorMeasurementsDTO {
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  minDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  maxDate?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(5)
  @MinLength(1)
  sensorCodeName?: string;
}
