import { Type } from 'class-transformer';
import { IsArray, IsDefined, ValidateNested } from 'class-validator';
import { CreateSensorMeasurementDTO } from './createSensorMeasurement.dto';

export class CreateSensorMeasurementsDTO {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSensorMeasurementDTO)
  sensorMeasurements!: CreateSensorMeasurementDTO[];
}
