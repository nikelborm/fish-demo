import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  createManyPlain,
  createOnePlain,
  deleteEntityByIdentity,
  findOnePlainByIdentity,
  getAllEntities,
  updateManyPlain,
  updateManyWithRelations,
  updateOnePlain,
  updateOneWithRelations,
} from 'src/tools';
import type { EntityRepoMethodTypes } from 'src/types';
import { Repository } from 'typeorm';
import { FishBatch } from '../model';
import { SelectedOnePlainFishKind } from './fishKind.repo';

@Injectable()
export class FishBatchRepo {
  constructor(
    @InjectRepository(FishBatch)
    private readonly repo: Repository<FishBatch>,
  ) {}

  getAll = getAllEntities(this.repo)<Config>();

  findOneById = async (
    id: number,
  ): Promise<RepoTypes['SelectedOnePlainEntity'] | null> =>
    await findOnePlainByIdentity(this.repo)<Config>()({ id });

  findOneByIDWithFishKind = async (
    id: number,
  ): Promise<
    | (RepoTypes['SelectedOnePlainEntity'] & {
        fishKind: SelectedOnePlainFishKind;
      })
    | null
  > => {
    return await this.repo.findOne({
      relations: { fishKind: true },
      where: { id },
    });
  };

  createOnePlain = createOnePlain(this.repo)<Config>();
  createManyPlain = createManyPlain(this.repo)<Config>();

  updateManyPlain = updateManyPlain(this.repo)<Config>();
  updateOnePlain = updateOnePlain(this.repo)<Config>();

  updateManyWithRelations = updateManyWithRelations(this.repo)<Config>();
  updateOneWithRelations = updateOneWithRelations(this.repo)<Config>();

  deleteOneById = async (id: number): Promise<void> =>
    await deleteEntityByIdentity(this.repo)<Config>()({ id });
}

type RepoTypes = EntityRepoMethodTypes<
  FishBatch,
  {
    EntityName: 'FishBatch';
    RequiredToCreateAndSelectRegularPlainKeys:
      | 'createdAt'
      | 'updatedAt'
      | 'name'
      | 'age';
    OptionalToCreateAndSelectRegularPlainKeys: null;

    ForbiddenToCreateGeneratedPlainKeys: 'id' | 'createdAt' | 'updatedAt';
    ForbiddenToUpdatePlainKeys: 'id' | 'createdAt' | 'updatedAt';
    ForbiddenToUpdateRelationKeys: null;
    UnselectedByDefaultPlainKeys: null;
  }
>;

type Config = RepoTypes['Config'];

export type SelectedOnePlainFishBatch = RepoTypes['SelectedOnePlainEntity'];
