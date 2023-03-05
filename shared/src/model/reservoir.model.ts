import type { ISensorInstance } from '.';

export class IReservoir {
  id!: number;

  sensorInstances!: ISensorInstance[];

  name!: string;

  createdAt!: Date;

  updatedAt!: Date;
}
