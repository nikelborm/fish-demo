import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsDefined,
  IsNumber,
  IsObject,
  ValidateNested,
} from 'class-validator';
import type { ISensorMeasurement } from '../../../model/sensorMeasurement.model';
import type { SensorParameterValueType } from '../../../sensorParameterValueType';

export class CreateSensorMeasurementDTO
  implements Omit<ISensorMeasurement, 'id' | 'sensorParameterInstance'>
{
  @IsNumber()
  sensorParameterInstanceId!: number;

  @Type(() => Date)
  @IsDate()
  recordedAt!: Date;

  @IsObject()
  value!: SensorParameterValueType;
}

export class CreateSensorMeasurementsDTO {
  @NestedArrayDTO(() => CreateSensorMeasurementDTO)
  sensorMeasurements!: CreateSensorMeasurementDTO[];
}
