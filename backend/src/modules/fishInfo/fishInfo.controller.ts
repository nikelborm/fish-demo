import { Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import {
  AccessEnum,
  AllowedFor,
  ApiController,
  ValidatedBody,
} from 'src/tools';
import {
  CreateFishInfoDTO,
  CreateOneFishInfoResponse,
  GetOneFishInfoByIdResponseDTO,
  UpdateFishInfoDTO,
  UpdateOneFishInfoResponse,
} from 'src/types';
import { FishInfoUseCase } from './fishInfo.useCase';

@ApiController('fishInfo')
export class FishInfoController {
  constructor(private readonly fishInfoUseCase: FishInfoUseCase) {}

  @Post('createFishInfo')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createFishInfo(
    @ValidatedBody()
    createFishInfoDTO: CreateFishInfoDTO,
  ): Promise<CreateOneFishInfoResponse> {
    return await this.fishInfoUseCase.createFishInfo(createFishInfoDTO);
  }

  @Get('/:fishInfoId')
  async findOneFishInfoById(
    @Param('fishInfoId', ParseIntPipe) fishInfoId: number,
  ): Promise<GetOneFishInfoByIdResponseDTO> {
    const fishInfo = await this.fishInfoUseCase.getOneById(fishInfoId);
    return fishInfo;
  }

  @Post('updateFishInfo')
  async updateFishInfo(
    @ValidatedBody()
    FishInfo: UpdateFishInfoDTO,
  ): Promise<UpdateOneFishInfoResponse> {
    return await this.fishInfoUseCase.updateFishInfo(FishInfo);
  }

  @Delete(':FishInfoId')
  async deleteFishInfo(@Param('FishInfoId') FishInfoId: number): Promise<void> {
    return await this.fishInfoUseCase.deleteFishInfo(FishInfoId);
  }
}
