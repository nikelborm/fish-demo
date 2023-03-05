import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNumber,
} from 'class-validator';
import { NestedArrayDTO } from '../../../../../tools';

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
  @NestedArrayDTO(() => CreateOneSensorMeasurementResponse)
  sensorMeasurements!: CreateOneSensorMeasurementResponse[];
}
