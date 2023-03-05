import type { IAbstractSensor, IAbstractSensorToSensorParameter, ISensorInstance } from '.';

export class ISensorParameter {
  id!: number;

  unit!: string;

  name!: string;

  abstractSensorsWithThatSensorParameter!: IAbstractSensor[];

  abstractSensorToSensorParameterRelations!: IAbstractSensorToSensorParameter[];

  sensorInstancesWithThatSensorParameter!: ISensorInstance[];

  createdAt!: Date;

  updatedAt!: Date;
}
