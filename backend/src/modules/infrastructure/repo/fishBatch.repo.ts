import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { insertManyPlain, insertOnePlain } from 'src/tools';
import { Repository } from 'typeorm';
import { FishBatch } from '../model';

@Injectable()
export class FishBatchRepo {
  constructor(
    @InjectRepository(FishBatch)
    private readonly repo: Repository<FishBatch>,
  ) {}

  async getAll(): Promise<SelectedOnePlainFishBatch[]> {
    return await this.repo.find();
  }

  async findOneById(id: number): Promise<SelectedOnePlainFishBatch | null> {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async createOnePlain(
    newFishBatch: Pick<FishBatch, PlainKeysAllowedToModify>,
  ): Promise<CreatedOnePlainFishBatch> {
    return await insertOnePlain<CreatedOnePlainFishBatch>(
      this.repo,
      newFishBatch,
    );
  }

  async createManyPlain(
    newFishBatches: Pick<FishBatch, PlainKeysAllowedToModify>[],
  ): Promise<CreatedOnePlainFishBatch[]> {
    return await insertManyPlain<CreatedOnePlainFishBatch>(
      this.repo,
      newFishBatches,
    );
  }

  async updateOnePlain({
    id,
    ...existingFishBatch
  }: UpdatedOnePlainFishBatch): Promise<UpdatedOnePlainFishBatch> {
    await this.repo.update(id, existingFishBatch);
    return { id, ...existingFishBatch };
  }

  async updateManyPlain(
    existingFishBatches: UpdatedOnePlainFishBatch[],
  ): Promise<UpdatedOnePlainFishBatch[]> {
    const updatedFishBatches = await this.repo.save(existingFishBatches);
    return updatedFishBatches;
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}

type PrimaryKeys = 'id';
type PlainKeysGeneratedAfterInsert = PrimaryKeys | 'createdAt' | 'updatedAt';

type PlainKeysAllowedToModify = RegularPlainKeys;

type UsuallyReturnedFishBatchPlainKeys =
  | PlainKeysGeneratedAfterInsert
  | RegularPlainKeys;

type RegularPlainKeys = 'name' | 'fish_kind_id' | 'age';

export type CreatedOnePlainFishBatch = Pick<
  FishBatch,
  PlainKeysAllowedToModify | PlainKeysGeneratedAfterInsert
>;

export type UpdatedOnePlainFishBatch = Pick<FishBatch, PrimaryKeys> &
  Partial<Pick<FishBatch, PlainKeysAllowedToModify>>;

export type SelectedOnePlainFishBatch = Pick<
  FishBatch,
  UsuallyReturnedFishBatchPlainKeys
>;
