import { ISensorMeasurement } from '../../../model';

export class CreateOneSensorMeasurementResponse implements ISensorMeasurement {
  id!: number;

  sensorCodeName!: string;

  date!: Date;

  value!: string;
}
