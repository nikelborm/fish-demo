import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsDefined,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateOneSensorMeasurementResponse {
  @IsNumber()
  id!: number;

  @IsDate()
  @Type(() => Date)
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

export class CreateManySensorMeasurementsResponseDTO {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOneSensorMeasurementResponse)
  sensorMeasurements!: CreateOneSensorMeasurementResponse[];
}
