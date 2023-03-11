import { Module } from '@nestjs/common';
import { FishBatchController } from './fishBatch.controller';
import { FishBatchUseCase } from './fishBatch.useCase';

@Module({
  providers: [FishBatchUseCase],
  controllers: [FishBatchController],
  exports: [FishBatchUseCase],
})
export class FishBatchModule {}
