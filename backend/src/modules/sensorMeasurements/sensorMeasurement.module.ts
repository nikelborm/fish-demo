import { Module } from '@nestjs/common';
import { SensorMeasurementController } from './sensorMeasurement.controller';
import { SensorMeasurementUseCase } from './sensorMeasurement.useCase';
import { SensorMeasurementWSGateway } from './sensorMeasurements.gateway';

@Module({
  providers: [SensorMeasurementUseCase, SensorMeasurementWSGateway],
  controllers: [SensorMeasurementController],
  exports: [SensorMeasurementUseCase],
})
export class SensorMeasurementModule {}
