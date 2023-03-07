import { Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiController, AuthorizedOnly } from 'src/tools';
import { FindOneReservoirByIdResponseDTO } from 'src/types';
import { ReservoirUseCase } from './reservoir.useCase';

@ApiController('reservoir')
export class ReservoirController {
  constructor(private readonly reservoirUseCase: ReservoirUseCase) {}

  @Get('/:reservoirId')
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
