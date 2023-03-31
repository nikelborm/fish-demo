import { BadRequestException, Injectable } from '@nestjs/common';
import { messages } from 'src/config';
import type {
  CreateSensorMeasurementDTO,
  FindSensorMeasurementsDTO,
  FlatSensorMeasurement,
} from 'src/types';
import { repo } from '../infrastructure';
import { SensorMeasurementWSGateway } from './sensorMeasurements.gateway';

@Injectable()
export class SensorMeasurementUseCase {
  constructor(
    private readonly sensorMeasurementRepo: repo.SensorMeasurementRepo,
    private readonly wsGateway: SensorMeasurementWSGateway,
    private readonly SensorInstanceRepo: repo.SensorInstanceRepo,
    private readonly alertRepo: repo.AlertRepo,
    private readonly alertTypeRepo: repo.AlertTypeRepo,
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
    if (sensorMeasurement.value > 0.8)
      await this.#createAlertForExtremeSensorMeasurement(
        sensorMeasurement.sensorParameterInstanceId,
      );
    return insertedSensorMeasurement;
  }

  async #createAlertForExtremeSensorMeasurement(
    sensorParameterInstanceId: number,
  ): Promise<void> {
    const sensorInstance =
      await this.SensorInstanceRepo.getSensorInstanceBySensorParameterInstanceId(
        sensorParameterInstanceId,
      );
    const reservoir = sensorInstance?.reservoir;
    if (!reservoir)
      throw new BadRequestException(
        messages.repo.common.cantCreateFKDoNotExist('reservoir'),
      );
    const alertTypeDescription = `Reservoir ${reservoir?.name} require attention`;
    let alertType = await this.alertTypeRepo.findOneByExactDescription(
      alertTypeDescription,
    );
    if (!alertType)
      alertType = await this.alertTypeRepo.createOnePlain({
        description: alertTypeDescription,
      });
    await this.alertRepo.createOnePlain({
      reservoir_id: reservoir.id,
      alert_type_id: alertType.id,
      importance: 1,
    });
  }
}
