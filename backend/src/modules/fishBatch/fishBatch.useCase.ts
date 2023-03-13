import { Injectable, NotFoundException } from '@nestjs/common';
import { messages } from 'src/config';
import type {
  CreateFishBatchDTO,
  CreateOneFishBatchResponse,
  UpdateFishBatchDTO,
  UpdateOneFishBatchResponse,
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
    const insertedFishBatch = await this.fishBatchRepo.createOnePlain(
      fishBatch,
    );
    return { fishBatch: insertedFishBatch };
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
