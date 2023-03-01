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

class ISensorMeasurement {
  @IsNumber()
  id!: number;

  @IsDate()
  @Type(() => Date)
  date!: Date;

  @IsString()
  @MaxLength(5)
  @MinLength(1)
  sensorCodeName!: string;

  @IsNumber()
  value!: number;
}

export class FindManySensorMeasurementsResponseDTO {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ISensorMeasurement)
  sensorMeasurements!: ISensorMeasurement[];
}
