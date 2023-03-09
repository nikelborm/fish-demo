import { Module } from '@nestjs/common';
import { FishKindController } from './fishKind.controller';
import { FishKindUseCase } from './fishKind.useCase';

@Module({
  providers: [FishKindUseCase],
  controllers: [FishKindController],
  exports: [FishKindUseCase],
})
export class FishKindModule {}
