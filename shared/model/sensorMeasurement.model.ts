import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ISensorMeasurement {
  @IsNumber()
  id!: number;

  @IsDate()
  @Type(() => Date)
  date!: Date;

  @IsString()
  @MaxLength(5)
  @MinLength(1)
  sensorCodeName!: string;

  @IsNumber()
  value!: number;
}
