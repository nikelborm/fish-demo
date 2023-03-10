import { Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiController } from 'src/tools';
import type { GetOneFishKindByIdResponseDTO } from 'src/types';
import type { CreateFishKindDTO } from 'src/types';
import { FishKindUseCase } from './fishKind.useCase';

@ApiController('fishKind')
export class FishKindController {
  constructor(private readonly fishKindUseCase: FishKindUseCase) {}

  @Get('/:fishKindId')
  async findOneReservoirById(
    @Param('fishKindId', ParseIntPipe) fishKindId: number,
  ): Promise<GetOneFishKindByIdResponseDTO> {
    const fishKind = await this.fishKindUseCase.getOneById(fishKindId);
    return fishKind;
  }

  @Post('createOne')
  // @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createFishKind(
    @ValidatedBody()
    createFishKindDTO: CreateFishKindDTO,
  ): Promise<EmptyResponseDTO> {
    await this.fishKindUseCase.createFishKind(createFishKindDTO);
    return {};
  }
}
