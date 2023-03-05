import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsDefined,
  IsNumber,
  ValidateNested,
} from 'class-validator';

export class CreateOneSensorMeasurementResponse {
  @IsNumber()
  id!: number;

  @IsDate()
  @Type(() => Date)
  recordedAt!: Date;

  @IsDefined()
  value!: any;
}

export class CreateManySensorMeasurementsResponseDTO {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOneSensorMeasurementResponse)
  sensorMeasurements!: CreateOneSensorMeasurementResponse[];
}
