import { Module } from '@nestjs/common';
import { PredictController } from './predict.controller';
import { PredictUseCase } from './predict.useCase';
import { PredictWSGateway } from './predict.gateway';

@Module({
  providers: [PredictUseCase, PredictWSGateway],
  controllers: [PredictController],
  exports: [PredictUseCase],
})
export class PredictModule {}
