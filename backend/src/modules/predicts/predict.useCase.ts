import { Injectable } from '@nestjs/common';
import type { CreatePredictDTO } from 'src/types';
import { PredictWSGateway } from './predict.gateway';

@Injectable()
export class PredictUseCase {
  constructor(private readonly wsGateway: PredictWSGateway) {}

  async createPredict(predict: CreatePredictDTO): Promise<void> {
    this.wsGateway.broadcastOneNew(predict);
  }
}
