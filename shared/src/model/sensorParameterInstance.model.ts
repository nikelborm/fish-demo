import type {
  IAbstractSensor,
  IAbstractSensorToSensorInstance,
  IAbstractSensorToSensorParameter,
  ISensorInstance,
  ISensorMeasurement,
  ISensorMeasurementConstraint,
  ISensorParameter,
} from '.';

export class ISensorParameterInstance {
  id!: number;

  sensorParameterId!: number;

  abstractSensorId!: number;

  sensorInstanceId!: number;

  sensorInstance!: ISensorInstance;

  sensorParameter!: ISensorParameter;

  abstractSensor!: IAbstractSensor;

  abstractSensorToSensorParameter!: IAbstractSensorToSensorParameter;

  abstractSensorToSensorInstance!: IAbstractSensorToSensorInstance;

  sensorMeasurements!: ISensorMeasurement[];

  sensorMeasurementConstraints!: ISensorMeasurementConstraint[];

  createdAt!: Date;

  updatedAt!: Date;
}
