import { Injectable } from '@nestjs/common';
import {
  CreateSensorMeasurementDTO,
  FindSensorMeasurementsDTO,
  ISensorMeasurement,
} from 'src/types';
import { repo } from '../infrastructure';
import { SensorMeasurementWSGateway } from './sensorMeasurements.gateway';

@Injectable()
export class SensorMeasurementUseCase {
  constructor(
    private readonly sensorMeasurementRepo: repo.SensorMeasurementRepo,
    private readonly wsGateway: SensorMeasurementWSGateway,
  ) {}

  async findManyWith(
    searchOptions: FindSensorMeasurementsDTO,
  ): Promise<ISensorMeasurement[]> {
    return await this.sensorMeasurementRepo.findManyWith(searchOptions);
  }

  async createManySensorMeasurements(
    sensorMeasurements: CreateSensorMeasurementDTO[],
  ): Promise<ISensorMeasurement[]> {
    const insertedSensorMeasurements =
      await this.sensorMeasurementRepo.createMany(sensorMeasurements);
    this.wsGateway.broadcastManyNew(insertedSensorMeasurements);
    return insertedSensorMeasurements;
  }

  async createSensorMeasurement(
    sensorMeasurement: CreateSensorMeasurementDTO,
  ): Promise<ISensorMeasurement> {
    const insertedSensorMeasurement =
      await this.sensorMeasurementRepo.createOne(sensorMeasurement);
    this.wsGateway.broadcastOneNew(insertedSensorMeasurement);
    return insertedSensorMeasurement;
  }
}
