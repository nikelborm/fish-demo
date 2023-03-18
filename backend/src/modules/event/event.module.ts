import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventUseCase } from './event.useCase';

@Module({
  providers: [EventUseCase],
  controllers: [EventController],
  exports: [EventUseCase],
})
export class EventModule {}
