import { Module } from '@nestjs/common';
import { SensorMeasurementController } from './sensorMeasurement.controller';
import { SensorMeasurementUseCase } from './sensorMeasurement.useCase';

@Module({
  providers: [SensorMeasurementUseCase],
  controllers: [SensorMeasurementController],
  exports: [SensorMeasurementUseCase],
})
export class SensorMeasurementModule {}
