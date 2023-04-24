import { Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import {
  AccessEnum,
  AllowedFor,
  ApiController,
  AuthorizedOnly,
  ValidatedBody,
} from 'src/tools';
import {
  CreateOneReservoirResponse,
  CreateReservoirDTO,
  FindOneReservoirByIdResponseDTO,
  UpdateOneReservoirResponse,
  UpdateReservoirDTO,
} from 'src/types';
import { ReservoirUseCase } from './reservoir.useCase';

@ApiController('reservoir')
export class ReservoirController {
  constructor(private readonly reservoirUseCase: ReservoirUseCase) {}

  @Post('create')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createReservoir(
    @ValidatedBody()
    createReservoirDTO: CreateReservoirDTO,
  ): Promise<CreateOneReservoirResponse> {
    return await this.reservoirUseCase.createReservoir(createReservoirDTO);
  }

  @Get('/:reservoirIdWithBatch')
  @AuthorizedOnly()
  async getOneByIdWithFishBatch(
    @Param('reservoirIdWithBatch', ParseIntPipe) reservoirId: number,
  ): Promise<FindOneReservoirByIdResponseDTO> {
    const reservoir = await this.reservoirUseCase.findOneReservoirById(
      reservoirId,
    );
    return { reservoir };
  }

  @Post('updateReservoir')
  async updateReservoir(
    @ValidatedBody()
    reservoir: UpdateReservoirDTO,
  ): Promise<UpdateOneReservoirResponse> {
    return await this.reservoirUseCase.updateReservoir(reservoir);
  }

  @Delete(':reservoirId')
  async deleteReservoir(
    @Param('reservoirId') reservoirId: number,
  ): Promise<void> {
    return await this.reservoirUseCase.deleteReservoir(reservoirId);
  }
}
