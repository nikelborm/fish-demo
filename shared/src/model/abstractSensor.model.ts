import type { IAbstractSensorToSensorInstance, IAbstractSensorToSensorParameter, ISensorParameter } from '.';

export class IAbstractSensor {
  id!: number;

  modelName!: string;

  sensorParameters!: ISensorParameter[];

  abstractSensorToSensorParameterRelations!: IAbstractSensorToSensorParameter[];

  abstractSensorToSensorInstanceRelations!: IAbstractSensorToSensorInstance[];

  createdAt!: Date;

  updatedAt!: Date;
}
