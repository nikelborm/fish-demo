import { CreateOneSensorMeasurementResponse } from './createOneSensorMeasurement.dto';

export class CreateManySensorMeasurementsResponseDTO {
  sensorMeasurements!: CreateOneSensorMeasurementResponse[];
}
