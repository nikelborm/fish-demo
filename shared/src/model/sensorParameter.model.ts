import type { IAbstractSensor, IAbstractSensorToSensorParameter } from '.';

export class ISensorParameter {
  id!: number;

  unit!: string;

  name!: string;

  abstractSensorsWithThatSensorParameter!: IAbstractSensor[];

  abstractSensorToSensorParameterRelations!: IAbstractSensorToSensorParameter[];

  createdAt!: Date;

  updatedAt!: Date;
}
