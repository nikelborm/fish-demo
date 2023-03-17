import { Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import {
  AccessEnum,
  AllowedFor,
  ApiController,
  ValidatedBody,
} from 'src/tools';
import {
  CreateFishBatchDTO,
  CreateOneFishBatchResponse,
  GetOneFishBatchByIdResponseDTO,
  UpdateFishBatchDTO,
  UpdateOneFishBatchResponse,
} from 'src/types';
import { FishBatchUseCase } from './fishBatch.useCase';

@ApiController('fishBatch')
export class FishBatchController {
  constructor(private readonly fishBatchUseCase: FishBatchUseCase) {}

  @Post('createFishBatch')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createFishBatch(
    @ValidatedBody()
    createFishBatchDTO: CreateFishBatchDTO,
  ): Promise<CreateOneFishBatchResponse> {
    return await this.fishBatchUseCase.createBatch(createFishBatchDTO);
  }

  @Get('/:fishBatchId')
  async getOneByIdWithFishKind(
    @Param('fishBatchId', ParseIntPipe) fishBatchId: number,
  ): Promise<GetOneFishBatchByIdResponseDTO> {
    const fishBatch = await this.fishBatchUseCase.getOneByIdWithFishKind(fishBatchId);
    return fishBatch;
  }

  @Post('updateFishBatch')
  async updateFishBatch(
    @ValidatedBody()
    FishBatch: UpdateFishBatchDTO,
  ): Promise<UpdateOneFishBatchResponse> {
    return await this.fishBatchUseCase.updateBatch(FishBatch);
  }

  @Delete(':FishBatchId')
  async deleteFishBatch(
    @Param('FishBatchId') FishBatchId: number,
  ): Promise<void> {
    return await this.fishBatchUseCase.deleteBatch(FishBatchId);
  }
}
