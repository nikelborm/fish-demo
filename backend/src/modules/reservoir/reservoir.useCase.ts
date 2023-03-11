import { Injectable, NotFoundException } from '@nestjs/common';
import type {
  CreateOneReservoirResponse,
  CreateReservoirDTO,
  ReservoirInfoDTO,
  UpdateOneReservoirResponse,
  UpdateReservoirDTO,
} from 'src/types';
import { messages } from 'src/config';
import { repo } from '../infrastructure';

@Injectable()
export class ReservoirUseCase {
  constructor(private readonly reservoirRepo: repo.ReservoirRepo) {}

  async findOneReservoirById(reservoirId: number): Promise<ReservoirInfoDTO> {
    const reservoir = await this.reservoirRepo.getReservoirFullInfo(
      reservoirId,
    );
    if (!reservoir)
      throw new NotFoundException(
        messages.repo.common.cantGetNotFoundById(reservoirId, 'reservoir'),
      );

    return reservoir;
  }

  async createManyReservoirs(
    reservoirs: CreateReservoirDTO[],
  ): Promise<repo.CreatedOnePlainReservoir[]> {
    const insertedReservoirs = await this.reservoirRepo.createManyPlain(
      reservoirs,
    );
    return insertedReservoirs;
  }

  async createReservoir(
    reservoir: CreateReservoirDTO,
  ): Promise<CreateOneReservoirResponse> {
    const insertedReservoir = await this.reservoirRepo.createOnePlain(
      reservoir,
    );
    return { reservoir: insertedReservoir };
  }

  async updateReservoir(
    reservoir: UpdateReservoirDTO,
  ): Promise<UpdateOneReservoirResponse> {
    const updatedReservoir = await this.reservoirRepo.updateOnePlain(reservoir);
    return updatedReservoir;
  }

  async deleteReservoir(reservoirId: number): Promise<void> {
    return await this.reservoirRepo.deleteOne(reservoirId);
  }
}
