import { Module } from '@nestjs/common';
import { ReservoirController } from './reservoir.controller';
import { ReservoirUseCase } from './reservoir.useCase';
import { ReservoirWSGateway } from './reservoirs.gateway';

@Module({
  providers: [ReservoirUseCase],
  controllers: [ReservoirController],
  exports: [ReservoirUseCase],
})
export class ReservoirModule {}
