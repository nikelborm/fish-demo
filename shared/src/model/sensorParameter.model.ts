import type {
  IAbstractSensor,
  IAbstractSensorToSensorParameter,
  ISensorInstance,
  ISensorParameterInstance,
} from '.';

export class ISensorParameter {
  id!: number;

  unit!: string;

  name!: string;

  abstractSensorsWithThatSensorParameter!: IAbstractSensor[];

  abstractSensorToSensorParameterRelations!: IAbstractSensorToSensorParameter[];

  sensorInstancesWithThatSensorParameter!: ISensorInstance[];

  sensorParameterInstances!: ISensorParameterInstance[];

  createdAt!: Date;

  updatedAt!: Date;
}
