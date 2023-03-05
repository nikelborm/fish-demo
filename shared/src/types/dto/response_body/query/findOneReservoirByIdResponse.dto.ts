import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

import { SensorParameterValueTypenameEnum } from '../../../sensorParameterValueType';

class AbstractSensorInReservoir {
  @IsNumber()
  id!: number;

  @IsString()
  modelName!: string;
}

class SensorParameterInReservoir {
  @IsNumber()
  id!: number;

  @IsString()
  name!: string;

  @IsString()
  unit!: string;

  @IsEnum(SensorParameterValueTypenameEnum)
  valueTypeName!: SensorParameterValueTypenameEnum;
}

class SensorParameterInstanceInReservoir {
  @IsNumber()
  id!: number;

  @IsDefined()
  @ValidateNested()
  @Type(() => SensorParameterInReservoir)
  sensorParameter!: SensorParameterInReservoir;
}

class AbstractSensorToSensorInstanceInReservoir {
  @IsDefined()
  @ValidateNested()
  @Type(() => AbstractSensorInReservoir)
  abstractSensor!: AbstractSensorInReservoir;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SensorParameterInstanceInReservoir)
  sensorParameterInstances!: SensorParameterInstanceInReservoir[];
}

class SensorInstanceInReservoir {
  @IsNumber()
  id!: number;

  @IsDefined()
  @ValidateNested()
  @Type(() => AbstractSensorToSensorInstanceInReservoir)
  abstractSensorToSensorInstance!: AbstractSensorToSensorInstanceInReservoir;
}

export class ReservoirInfoDTO {
  @IsNumber()
  id!: number;

  @IsString()
  name!: string;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SensorInstanceInReservoir)
  sensorInstances!: SensorInstanceInReservoir[];
}

export class FindOneReservoirByIdResponseDTO {
  @IsDefined()
  @ValidateNested()
  @Type(() => ReservoirInfoDTO)
  reservoir!: ReservoirInfoDTO;
}
