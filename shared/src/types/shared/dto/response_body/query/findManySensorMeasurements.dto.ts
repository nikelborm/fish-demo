import { Type } from 'class-transformer';
import { IsDate, IsDefined, IsEnum, IsNumber, IsString } from 'class-validator';
import {
  SensorParameterValueType,
  SensorParameterValueTypenameEnum,
} from '../../../sensorParameterValueType';
import { NestedArrayDTO, NestedDTO } from '../../../../../tools';

// class SimpleAbstractSensor {
//   @IsNumber()
//   id!: number;

//   @IsString()
//   modelName!: string;
// }

// class SimpleSensorParameter {
//   @IsNumber()
//   id!: number;

//   @IsString()
//   name!: string;

//   @IsString()
//   unit!: string;

//   @IsEnum(SensorParameterValueTypenameEnum)
//   valueTypeName!: SensorParameterValueTypenameEnum;
// }

// class SimpleSensorParameterInstance {
//   @NestedDTO(() => SimpleAbstractSensor)
//   abstractSensor!: SimpleAbstractSensor;

//   @NestedDTO(() => SimpleSensorParameter)
//   sensorParameter!: SimpleSensorParameter;
// }

export class FlatSensorMeasurement {
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
  @NestedArrayDTO(() => FlatSensorMeasurement)
  sensorMeasurements!: FlatSensorMeasurement[];
}
