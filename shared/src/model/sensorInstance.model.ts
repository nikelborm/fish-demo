import type {
  IAbstractSensorToSensorInstance,
  IReservoir,
  ISensorParameter,
  ISensorParameterInstance,
} from '.';

export class ISensorInstance {
  id!: number;

  abstractSensorToSensorInstance!: IAbstractSensorToSensorInstance;

  sensorParameters!: ISensorParameter[];

  sensorParameterInstances!: ISensorParameterInstance[];

  reservoir!: IReservoir;

  reservoirId!: number;

  createdAt!: Date;

  updatedAt!: Date;
}
