import type {
  IAbstractSensorToSensorInstance,
  IAbstractSensorToSensorParameter,
  ISensorParameter,
  ISensorParameterInstance,
} from '.';

export class IAbstractSensor {
  id!: number;

  modelName!: string;

  sensorParameters!: ISensorParameter[];

  abstractSensorToSensorParameterRelations!: IAbstractSensorToSensorParameter[];

  abstractSensorToSensorInstanceRelations!: IAbstractSensorToSensorInstance[];

  sensorParameterInstances!: ISensorParameterInstance[];

  createdAt!: Date;

  updatedAt!: Date;
}
