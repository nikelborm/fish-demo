import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsObject } from 'class-validator';
import { NestedArrayDTO } from '../../../../../tools';
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
