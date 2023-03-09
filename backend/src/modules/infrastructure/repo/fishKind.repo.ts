import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { insertManyPlain, insertOnePlain } from 'src/tools';
import { Repository } from 'typeorm';
import { FishKind } from '../model';

@Injectable()
export class FishKindRepo {
  constructor(
    @InjectRepository(FishKind)
    private readonly repo: Repository<FishKind>,
  ) {}

  async getAll(): Promise<SelectedOnePlainFishKind[]> {
    return await this.repo.find();
  }

  async findOneById(id: number): Promise<SelectedOnePlainFishKind | null> {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async createOnePlain(
    newFishKind: Pick<FishKind, PlainKeysAllowedToModify>,
  ): Promise<CreatedOnePlainFishKind> {
    return await insertOnePlain<CreatedOnePlainFishKind>(
      this.repo,
      newFishKind,
    );
  }

  async createManyPlain(
    newFishKinds: Pick<FishKind, PlainKeysAllowedToModify>[],
  ): Promise<CreatedOnePlainFishKind[]> {
    return await insertManyPlain<CreatedOnePlainFishKind>(
      this.repo,
      newFishKinds,
    );
  }

  async updateOnePlain({
    id,
    ...existingFishKind
  }: UpdatedOnePlainFishKind): Promise<UpdatedOnePlainFishKind> {
    await this.repo.update(id, existingFishKind);
    return { id, ...existingFishKind };
  }

  async updateManyPlain(
    existingFishKinds: UpdatedOnePlainFishKind[],
  ): Promise<UpdatedOnePlainFishKind[]> {
    const updatedFishKinds = await this.repo.save(existingFishKinds);
    return updatedFishKinds;
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}

type PrimaryKeys = 'id';
type PlainKeysGeneratedAfterInsert = PrimaryKeys | 'createdAt' | 'updatedAt';

type PlainKeysAllowedToModify = RegularPlainKeys;

type UsuallyReturnedFishKindPlainKeys =
  | PlainKeysGeneratedAfterInsert
  | RegularPlainKeys;

type RegularPlainKeys = 'name' | 'description' | 'icon';

export type CreatedOnePlainFishKind = Pick<
  FishKind,
  PlainKeysAllowedToModify | PlainKeysGeneratedAfterInsert
>;

export type UpdatedOnePlainFishKind = Pick<FishKind, PrimaryKeys> &
  Partial<Pick<FishKind, PlainKeysAllowedToModify>>;

export type SelectedOnePlainFishKind = Pick<
  FishKind,
  UsuallyReturnedFishKindPlainKeys
>;
