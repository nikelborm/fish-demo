import { Module } from '@nestjs/common';
import { TaskToReservoirController } from './taskToReservoir.controller';
import { TaskToReservoirUseCase } from './taskToReservoir.useCase';

@Module({
  providers: [TaskToReservoirUseCase],
  controllers: [TaskToReservoirController],
  exports: [TaskToReservoirUseCase],
})
export class TaskToReservoirModule {}
