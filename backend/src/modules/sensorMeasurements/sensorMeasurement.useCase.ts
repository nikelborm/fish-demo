import { Injectable } from '@nestjs/common';
import {
  CreateSensorMeasurementDTO,
  FindSensorMeasurementsDTO,
  ISensorMeasurement,
} from 'src/types';
import { repo } from '../infrastructure';

@Injectable()
export class SensorMeasurementUseCase {
  constructor(
    private readonly sensorMeasurementRepo: repo.SensorMeasurementRepo,
  ) {}

  async findManyWith(
    searchOptions: FindSensorMeasurementsDTO,
  ): Promise<ISensorMeasurement[]> {
    return await this.sensorMeasurementRepo.findManyWith(searchOptions);
  }

  async createManySensorMeasurements(
    sensorMeasurements: CreateSensorMeasurementDTO[],
  ): Promise<ISensorMeasurement[]> {
    return await this.sensorMeasurementRepo.createMany(sensorMeasurements);
  }

  async createSensorMeasurement(
    sensorMeasurement: CreateSensorMeasurementDTO,
  ): Promise<ISensorMeasurement> {
    return await this.sensorMeasurementRepo.createOne(sensorMeasurement);
  }
}
