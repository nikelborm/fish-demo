import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { messages } from 'src/config';
import { isQueryFailedError } from 'src/tools';
import {
  CreateFishBatchDTO,
  CreateOneFishBatchResponse,
  UpdateFishBatchDTO,
  UpdateOneFishBatchResponse,
  PG_FOREIGN_KEY_CONSTRAINT_VIOLATION,
} from 'src/types';
import { model, repo } from '../infrastructure';

@Injectable()
export class FishBatchUseCase {
  constructor(private readonly fishBatchRepo: repo.FishBatchRepo) {}

  async getOneById(id: number): Promise<repo.SelectedOnePlainFishBatch> {
    const fishBatch = await this.fishBatchRepo.findOneById(id);

    if (!fishBatch)
      throw new NotFoundException(
        messages.repo.common.cantGetNotFoundById(id, 'fishBatch'),
      );

    return fishBatch;
  }

  async getOneByIdWithFishKind(id: number): Promise<
    repo.SelectedOnePlainFishBatch & {
      fishKind: repo.SelectedOnePlainFishKind;
    }
  > {
    const fishBatch = await this.fishBatchRepo.findOneByIDWithFishKind(id);

    if (!fishBatch)
      throw new NotFoundException(
        messages.repo.common.cantGetNotFoundById(id, 'fishBatch'),
      );

    return fishBatch;
  }

  async createManyBatches(
    fishBatches: CreateFishBatchDTO[],
  ): Promise<
    Required<
      CreateFishBatchDTO &
        Pick<model.FishBatch, 'id' | 'createdAt' | 'updatedAt'>
    >[]
  > {
    const insertedFishBatches = await this.fishBatchRepo.createManyPlain(
      fishBatches,
    );
    return insertedFishBatches;
  }

  async createBatch(
    fishBatch: CreateFishBatchDTO,
  ): Promise<CreateOneFishBatchResponse> {
    try {
      const insertedFishBatch = await this.fishBatchRepo.createOnePlain(
        fishBatch,
      );
      return { fishBatch: insertedFishBatch };
    } catch (error: any) {
      if (isQueryFailedError(error))
        if (error.code === PG_FOREIGN_KEY_CONSTRAINT_VIOLATION)
          throw new BadRequestException(
            messages.repo.common.cantCreateFKDoNotExist('fishBatch'),
          );
      throw error;
    }
  }

  async updateBatch({
    id,
    ...fishBatch
  }: UpdateFishBatchDTO): Promise<UpdateOneFishBatchResponse> {
    const updatedFishBatch = await this.fishBatchRepo.updateOnePlain(
      { id },
      fishBatch,
    );
    return updatedFishBatch;
  }

  async deleteBatch(fishBatchId: number): Promise<void> {
    return await this.fishBatchRepo.deleteOneById(fishBatchId);
  }
}
