import { Injectable } from '@nestjs/common';
import { CreateReservoirDTO, FindReservoirsDTO, IReservoir } from 'src/types';
import { repo } from '../infrastructure';
import { ReservoirWSGateway } from './reservoirs.gateway';

@Injectable()
export class ReservoirUseCase {
  constructor(
    private readonly reservoirRepo: repo.ReservoirRepo,
    private readonly wsGateway: ReservoirWSGateway,
  ) {}

  async findOneReservoirById(
    searchOptions: FindReservoirsDTO,
  ): Promise<IReservoir[]> {
    return await this.reservoirRepo.findManyWith(searchOptions);
  }

  async createManyReservoirs(
    reservoirs: CreateReservoirDTO[],
  ): Promise<IReservoir[]> {
    const insertedReservoirs = await this.reservoirRepo.createMany(reservoirs);
    this.wsGateway.broadcastManyNew(insertedReservoirs);
    return insertedReservoirs;
  }

  async createReservoir(reservoir: CreateReservoirDTO): Promise<IReservoir> {
    const insertedReservoir = await this.reservoirRepo.createOne(reservoir);
    this.wsGateway.broadcastOneNew(insertedReservoir);
    return insertedReservoir;
  }
}
