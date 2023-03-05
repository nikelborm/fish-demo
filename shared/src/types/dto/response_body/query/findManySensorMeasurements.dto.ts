import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsDefined,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  SensorParameterValueType,
  SensorParameterValueTypenameEnum,
} from 'src/types';

class SimpleAbstractSensor {
  @IsNumber()
  id!: number;

  @IsString()
  modelName!: string;
}

class SimpleSensorParameter {
  @IsNumber()
  id!: number;

  @IsString()
  name!: string;

  @IsString()
  unit!: string;

  @IsEnum(SensorParameterValueTypenameEnum)
  valueTypeName!: SensorParameterValueTypenameEnum;
}

class SimpleSensorParameterInstance {
  @IsDefined()
  @ValidateNested()
  @Type(() => SimpleAbstractSensor)
  abstractSensor!: SimpleAbstractSensor;

  @IsDefined()
  @ValidateNested()
  @Type(() => SimpleSensorParameter)
  sensorParameter!: SimpleSensorParameter;
}

class FlatSensorMeasurement {
  @IsNumber()
  id!: number;

  @IsDate()
  @Type(() => Date)
  recordedAt!: Date;

  @IsDefined()
  value!: SensorParameterValueType;

  @IsNumber()
  sensorParameterInstanceId!: number;
}

export class FindManySensorMeasurementsResponseDTO {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlatSensorMeasurement)
  sensorMeasurements!: FlatSensorMeasurement[];
}
