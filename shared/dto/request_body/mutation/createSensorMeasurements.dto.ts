import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsDefined,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import type { ISensorMeasurement } from '../../../model/sensorMeasurement.model';

export class CreateSensorMeasurementDTO
  implements Omit<ISensorMeasurement, 'id'>
{
  @Type(() => Date)
  @IsDate()
  date!: Date;

  @IsString()
  @MaxLength(5)
  @MinLength(1)
  sensorCodeName!: string;

  @IsString()
  @MaxLength(50)
  @MinLength(1)
  value!: string;
}

export class CreateSensorMeasurementsDTO {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSensorMeasurementDTO)
  sensorMeasurements!: CreateSensorMeasurementDTO[];
}
