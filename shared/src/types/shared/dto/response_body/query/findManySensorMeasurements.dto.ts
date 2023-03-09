import { Type } from 'class-transformer';
import { IsDate, IsDefined, IsNumber, IsNumberString } from 'class-validator';
import { NestedArrayDTO } from '../../../../../tools/shared';
import type { SensorParameterValueType } from '../../../sensorParameterValueType';

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
  @IsNumberString()
  id!: string;
  // id!: string because postgres bigint is larger than javascript can handle
  // https://github.com/typeorm/typeorm/issues/8583#issuecomment-1024907598

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
