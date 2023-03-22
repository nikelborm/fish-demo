import { Module } from '@nestjs/common';
import { AlertTypeController } from './alertType.controller';
import { AlertTypeUseCase } from './alertType.useCase';

@Module({
  providers: [AlertTypeUseCase],
  controllers: [AlertTypeController],
  exports: [AlertTypeUseCase],
})
export class AlertTypeModule {}
