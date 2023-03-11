import { Module } from '@nestjs/common';
import { EventTypeController } from './eventType.controller';
import { EventTypeUseCase } from './eventType.useCase';

@Module({
  providers: [EventTypeUseCase],
  controllers: [EventTypeController],
  exports: [EventTypeUseCase],
})
export class EventTypeModule {}
