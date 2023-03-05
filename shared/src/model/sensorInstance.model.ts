import type { IAbstractSensorToSensorInstance } from './';

export class ISensorInstance {
  id!: number;

  abstractSensorToSensorInstance!: IAbstractSensorToSensorInstance[];

  createdAt!: Date;

  updatedAt!: Date;
}
