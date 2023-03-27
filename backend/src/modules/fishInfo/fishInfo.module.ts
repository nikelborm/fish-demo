import { Module } from '@nestjs/common';
import { FishInfoController } from './fishInfo.controller';
import { FishInfoUseCase } from './fishInfo.useCase';

@Module({
  providers: [FishInfoUseCase],
  controllers: [FishInfoController],
  exports: [FishInfoUseCase],
})
export class FishInfoModule {}
