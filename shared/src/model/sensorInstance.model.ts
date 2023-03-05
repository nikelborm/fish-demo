import type { IAbstractSensorToSensorInstance, ISensorParameter } from './';

export class ISensorInstance {
  id!: number;

  abstractSensorToSensorInstance!: IAbstractSensorToSensorInstance[];

  sensorParameters!: ISensorParameter[];

  createdAt!: Date;

  updatedAt!: Date;
}
