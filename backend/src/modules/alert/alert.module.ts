import { Module } from '@nestjs/common';
import { AlertController } from './alert.controller';
import { AlertUseCase } from './alert.useCase';

@Module({
  providers: [AlertUseCase],
  controllers: [AlertController],
  exports: [AlertUseCase],
})
export class AlertModule {}
