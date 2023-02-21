import { Type } from 'class-transformer';
import { IsDate, IsString, MaxLength, MinLength } from 'class-validator';
import { ISensorMeasurement } from '../../../model';

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
