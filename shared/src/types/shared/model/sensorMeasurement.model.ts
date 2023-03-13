import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNumber,
  IsNumberString,
  IsOptional,
} from 'class-validator';
import type { SensorParameterValueType } from '../modelHelper';
import type { ISensorParameterInstance } from './sensorParameterInstance.model';

export class ISensorMeasurement {
  // id!: string because postgres bigint is larger than javascript can handle
  // https://github.com/typeorm/typeorm/issues/8583#issuecomment-1024907598
  @IsNumberString()
  id!: string;

  @IsDate()
  @Type(() => Date)
  recordedAt!: Date;

  @IsDefined()
  value!: SensorParameterValueType;

  @IsOptional()
  sensorParameterInstance!: ISensorParameterInstance;

  @IsNumber()
  sensorParameterInstanceId!: number;
}
