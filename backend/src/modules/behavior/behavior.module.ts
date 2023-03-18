import { Module } from '@nestjs/common';
import { BehaviorController } from './behavior.controller';
import { BehaviorUseCase } from './behavior.useCase';

@Module({
  providers: [BehaviorUseCase],
  controllers: [BehaviorController],
  exports: [BehaviorUseCase],
})
export class BehaviorModule {}
