import type { IAbstractSensorToSensorInstance, IAbstractSensorToSensorParameter } from '.';

export class ISensorParameterInstance {
  id!: number;

  sensorParameterId!: number;

  abstractSensorId!: number;

  sensorInstanceId!: number;

  abstractSensorToSensorParameter!: IAbstractSensorToSensorParameter;

  abstractSensorToSensorInstance!: IAbstractSensorToSensorInstance;

  createdAt!: Date;

  updatedAt!: Date;
}
