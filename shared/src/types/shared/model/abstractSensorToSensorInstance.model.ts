import type { IAbstractSensor, ISensorInstance } from '.';

export class IAbstractSensorToSensorInstance {
  abstractSensor!: IAbstractSensor;

  abstractSensorId!: number;

  sensorInstance!: ISensorInstance;

  sensorInstanceId!: number;
}
