import { Get, Param, ParseIntPipe, Post, Request } from '@nestjs/common';
import { ApiController, AuthorizedOnly, ValidatedBody } from 'src/tools';
import { AuthedRequest, FindOneReservoirByIdResponseDTO } from 'src/types';
import { ReservoirUseCase } from './reservoir.useCase';

@ApiController('reservoir')
export class ReservoirController {
  constructor(private readonly reservoirUseCase: ReservoirUseCase) {}

  @Get(':reservoirId')
  @AuthorizedOnly()
  async findOneReservoirById(
    @Param('reservoirId', ParseIntPipe) reservoirId: number,
  ): Promise<FindOneReservoirByIdResponseDTO> {
    const reservoir = await this.reservoirUseCase.findOneReservoirById(
      reservoirId,
    );
    return {
      reservoir,
    };
  }
}
