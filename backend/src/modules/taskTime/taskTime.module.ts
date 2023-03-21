import { Module } from '@nestjs/common';
import { TaskTimeController } from './taskTime.controller';
import { TaskTimeUseCase } from './taskTime.useCase';

@Module({
  providers: [TaskTimeUseCase],
  controllers: [TaskTimeController],
  exports: [TaskTimeUseCase],
})
export class TaskTimeModule {}
