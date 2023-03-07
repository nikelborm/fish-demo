import type {
  IAbstractSensor,
  ISensorParameter,
  ISensorParameterInstance,
} from '.';

export class IAbstractSensorToSensorParameter {
  abstractSensor!: IAbstractSensor;

  abstractSensorId!: number;

  sensorParameter!: ISensorParameter;

  sensorParameterId!: number;

  sensorParameterInstances!: ISensorParameterInstance[];
}
