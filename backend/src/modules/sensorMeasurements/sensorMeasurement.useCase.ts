import { Injectable } from '@nestjs/common';
import {
  CreateSensorMeasurementDTO,
  FindSensorMeasurementsDTO,
  FlatSensorMeasurement,
} from 'src/types';
import { repo } from '../infrastructure';
import { SensorMeasurementConstraintRepo } from '../infrastructure/repo';
import { SensorMeasurementWSGateway } from './sensorMeasurements.gateway';

@Injectable()
export class SensorMeasurementUseCase {
  constructor(
    private readonly sensorMeasurementRepo: repo.SensorMeasurementRepo,
    private readonly wsGateway: SensorMeasurementWSGateway,
    private readonly sensorMeasurementConstraintRepo: SensorMeasurementConstraintRepo,
  ) {}

  async findManyWith(
    searchOptions: FindSensorMeasurementsDTO,
  ): Promise<FlatSensorMeasurement[]> {
    return await this.sensorMeasurementRepo.findManyWith(searchOptions);
  }

  async createManySensorMeasurements(
    sensorMeasurements: CreateSensorMeasurementDTO[],
  ): Promise<FlatSensorMeasurement[]> {
    const insertedSensorMeasurements =
      await this.sensorMeasurementRepo.createManyPlain(sensorMeasurements);
    this.wsGateway.broadcastManyNew(insertedSensorMeasurements);
    return insertedSensorMeasurements;
  }

  async createSensorMeasurement(
    sensorMeasurement: CreateSensorMeasurementDTO,
  ): Promise<FlatSensorMeasurement> {
    const insertedSensorMeasurement =
      await this.sensorMeasurementRepo.createOnePlain(sensorMeasurement);
    this.wsGateway.broadcastManyNew([insertedSensorMeasurement]);
    const sensorParameterInstanceId =
      CreateSensorMeasurementDTO.sensorParameterInstanceId;
    const constraints =
      await this.sensorMeasurementConstraintRepo.findAllBySensorParameterInstanceId(
        sensorParameterInstanceId,
      );
    if (constraints.length > 0) {
      return { insertedSensorMeasurement, constraints };
    } else {
      return insertedSensorMeasurement;
    }
  }
}
