import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
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

  @WebSocketServer()
  server!: Server;

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
    this.server
      .to(
        [
          ...new Set(
            sensorMeasurements.map(({ sensorCodeName }) => sensorCodeName),
          ),
        ].map((sensor) => `newSensorMeasurement{${sensor}}`),
      )
      .emit('manyNewMeasurements', insertedSensorMeasurements);
    return insertedSensorMeasurements;
  }

  async createSensorMeasurement(
    sensorMeasurement: CreateSensorMeasurementDTO,
  ): Promise<ISensorMeasurement> {
    const insertedSensorMeasurement =
      await this.sensorMeasurementRepo.createOne(sensorMeasurement);
    this.server
      .to(`newSensorMeasurement{${sensorMeasurement.sensorCodeName}}`)
      .emit('manyNewMeasurements', insertedSensorMeasurement);
    return insertedSensorMeasurement;
  }
}
