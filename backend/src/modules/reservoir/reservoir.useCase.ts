import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  CreateOneReservoirResponse,
  CreateReservoirDTO,
  ReservoirInfoDTO,
  UpdateOneReservoirResponse,
  UpdateReservoirDTO,
  PG_FOREIGN_KEY_CONSTRAINT_VIOLATION,
} from 'src/types';
import { messages } from 'src/config';
import { isQueryFailedError } from 'src/tools';
import { model, repo } from '../infrastructure';

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

  async findOneReservoirByIdWithFishBatch(reservoirId: number): Promise<
    repo.SelectedOnePlainReservoir & {
      fishBatch: repo.SelectedOnePlainFishBatch;
    }
  > {
    const reservoir = await this.reservoirRepo.findOneByIDWithFishBatch(
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
  ): Promise<
    Required<
      CreateReservoirDTO &
        Pick<model.Reservoir, 'id' | 'createdAt' | 'updatedAt'>
    >[]
  > {
    const insertedReservoirs = await this.reservoirRepo.createManyPlain(
      reservoirs,
    );
    return insertedReservoirs;
  }

  async createReservoir(
    reservoir: CreateReservoirDTO,
  ): Promise<CreateOneReservoirResponse> {
    try {
      const insertedReservoir = await this.reservoirRepo.createOnePlain(
        reservoir,
      );
      return { reservoir: insertedReservoir };
    } catch (error: any) {
      if (isQueryFailedError(error))
        if (error.code === PG_FOREIGN_KEY_CONSTRAINT_VIOLATION)
          throw new BadRequestException(
            messages.repo.common.cantCreateFKDoNotExist('reservoir'),
          );
      throw error;
    }
  }

  async updateReservoir({
    id,
    ...rest
  }: UpdateReservoirDTO): Promise<UpdateOneReservoirResponse> {
    const updatedReservoir = await this.reservoirRepo.updateOnePlain(
      { id },
      rest,
    );
    return updatedReservoir;
  }

  async deleteReservoir(reservoirId: number): Promise<void> {
    return await this.reservoirRepo.deleteOneById(reservoirId);
  }
}
