import { Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import {
  AccessEnum,
  AllowedFor,
  ApiController,
  ValidatedBody,
} from 'src/tools';
import type {
  CreateFishKindDTO,
  CreateOneFishKindResponse,
  GetOneFishKindByIdResponseDTO,
  UpdateFishKindDTO,
  UpdateOneFishKindResponse,
} from 'src/types';
import { FishKindUseCase } from './fishKind.useCase';

@ApiController('fishKind')
export class FishKindController {
  constructor(private readonly fishKindUseCase: FishKindUseCase) {}

  @Post('createFishKind')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createFishKind(
    @ValidatedBody()
    createFishKindDTO: CreateFishKindDTO,
  ): Promise<CreateOneFishKindResponse> {
    return await this.fishKindUseCase.createKind(createFishKindDTO);
  }

  @Get('/:fishKindId')
  async findOneFishKindById(
    @Param('fishKindId', ParseIntPipe) fishKindId: number,
  ): Promise<GetOneFishKindByIdResponseDTO> {
    const fishKind = await this.fishKindUseCase.getOneById(fishKindId);
    return fishKind;
  }

  @Post('updateFishKind')
  async updateFishKind(
    @ValidatedBody()
    FishKind: UpdateFishKindDTO,
  ): Promise<UpdateOneFishKindResponse> {
    return await this.fishKindUseCase.updateKind(FishKind);
  }

  @Delete(':FishKindId')
  async deleteFishKind(@Param('FishKindId') FishKindId: number) {
    return await this.fishKindUseCase.deleteKind(FishKindId);
  }
}
