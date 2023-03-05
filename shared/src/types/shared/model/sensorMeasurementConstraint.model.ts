import type { ISensorParameterInstance } from '.';

export class ISensorMeasurementConstraint {
  id!: number;

  sensorParameterInstance!: ISensorParameterInstance;

  sensorParameterInstanceId!: number;

  createdAt!: Date;

  updatedAt!: Date;
}
