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
import { FishInfo } from '../model';

@Injectable()
export class FishInfoRepo {
  constructor(
    @InjectRepository(FishInfo)
    private readonly repo: Repository<FishInfo>,
  ) {}

  getAll = getAllEntities(this.repo)<Config>();

  findOneById = async (
    id: number,
  ): Promise<RepoTypes['SelectedOnePlainEntity'] | null> =>
    await findOnePlainByIdentity(this.repo)<Config>()({ id });

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
  FishInfo,
  {
    EntityName: 'FishInfo';
    RequiredToCreateAndSelectRegularPlainKeys:
      | 'createdAt'
      | 'updatedAt'
      | 'name'
      | 'behavior_id'
      | 'description';
    OptionalToCreateAndSelectRegularPlainKeys: null;

    ForbiddenToCreateGeneratedPlainKeys: 'id' | 'createdAt' | 'updatedAt';
    ForbiddenToUpdatePlainKeys: 'id' | 'createdAt' | 'updatedAt';
    ForbiddenToUpdateRelationKeys: null;
    UnselectedByDefaultPlainKeys: null;
  }
>;

type Config = RepoTypes['Config'];

export type OnePlainFishInfoToBeCreated =
  RepoTypes['OnePlainEntityToBeCreated'];
export type OnePlainFishInfoToBeUpdated =
  RepoTypes['OnePlainEntityToBeUpdated'];
export type OneFishInfoWithRelationsToBeUpdated =
  RepoTypes['OneEntityWithRelationsToBeUpdated'];
export type SelectedOnePlainFishInfo = RepoTypes['SelectedOnePlainEntity'];
