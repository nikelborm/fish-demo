import { Module } from '@nestjs/common';
import { BehaviorTypeController } from './behaviorType.controller';
import { BehaviorTypeUseCase } from './behaviorType.useCase';

@Module({
  providers: [BehaviorTypeUseCase],
  controllers: [BehaviorTypeController],
  exports: [BehaviorTypeUseCase],
})
export class BehaviorTypeModule {}
