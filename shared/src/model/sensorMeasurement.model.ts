import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsObject, IsOptional } from 'class-validator';
import { SensorParameterValueType } from '../sensorParameterValueType';
import type { ISensorParameterInstance } from './sensorParameterInstance.model';

export class ISensorMeasurement {
  @IsNumber()
  id!: number;

  @IsDate()
  @Type(() => Date)
  recordedAt!: Date;

  @IsObject()
  value!: SensorParameterValueType;

  @IsOptional()
  sensorParameterInstance!: ISensorParameterInstance;

  @IsNumber()
  sensorParameterInstanceId!: number;
}
