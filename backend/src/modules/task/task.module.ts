import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskUseCase } from './task.useCase';

@Module({
  providers: [TaskUseCase],
  controllers: [TaskController],
  exports: [TaskUseCase],
})
export class TaskModule {}
