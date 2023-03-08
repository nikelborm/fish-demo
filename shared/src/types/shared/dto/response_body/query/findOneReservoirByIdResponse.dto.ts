import { IsEnum, IsNumber, IsString } from 'class-validator';
import { NestedArrayDTO, NestedDTO } from '../../../../../tools/shared';
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
  shortName!: string;

  @IsString()
  unit!: string;

  @IsEnum(SensorParameterValueTypenameEnum)
  valueTypeName!: SensorParameterValueTypenameEnum;
}

export class SensorParameterInstanceInReservoir {
  @IsNumber()
  id!: number;

  @NestedDTO(() => SensorParameterInReservoir)
  sensorParameter!: SensorParameterInReservoir;
}

class AbstractSensorToSensorInstanceInReservoir {
  @NestedDTO(() => AbstractSensorInReservoir)
  abstractSensor!: AbstractSensorInReservoir;

  @NestedArrayDTO(() => SensorParameterInstanceInReservoir)
  sensorParameterInstances!: SensorParameterInstanceInReservoir[];
}

class SensorInstanceInReservoir {
  @IsNumber()
  id!: number;

  @NestedDTO(() => AbstractSensorToSensorInstanceInReservoir)
  abstractSensorToSensorInstance!: AbstractSensorToSensorInstanceInReservoir;
}

export class ReservoirInfoDTO {
  @IsNumber()
  id!: number;

  @IsString()
  name!: string;

  @NestedArrayDTO(() => SensorInstanceInReservoir)
  sensorInstances!: SensorInstanceInReservoir[];
}

export class FindOneReservoirByIdResponseDTO {
  @NestedDTO(() => ReservoirInfoDTO)
  reservoir!: ReservoirInfoDTO;
}
