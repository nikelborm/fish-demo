import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  createManyPlain,
  createOnePlain,
  deleteEntityByIdentity,
  getAllEntities,
  updateManyPlain,
  updateManyWithRelations,
  updateOnePlain,
  updateOneWithRelations,
} from 'src/tools';
import type { EntityRepoMethodTypes } from 'src/types';
import { Repository } from 'typeorm';
import { Behavior } from '../model';
import { SelectedOnePlainReservoir } from './reservoir.repo';

@Injectable()
export class BehaviorRepo {
  constructor(
    @InjectRepository(Behavior)
    private readonly repo: Repository<Behavior>,
  ) {}

  getAll = getAllEntities(this.repo)<Config>();

  findOneByIdWithReservoir = async (
    id: number,
  ): Promise<
    | (RepoTypes['SelectedOnePlainEntity'] & {
        reservoir: SelectedOnePlainReservoir;
      })
    | null
  > => {
    return await this.repo.findOne({
      relations: { reservoir: true },
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
  Behavior,
  {
    EntityName: 'Behavior';
    RequiredToCreateAndSelectRegularPlainKeys:
      | 'probability'
      | 'time'
      | 'behaviorTypeId'
      | 'reservoirId'
      | 'createdAt'
      | 'updatedAt';
    OptionalToCreateAndSelectRegularPlainKeys: null;

    ForbiddenToCreateGeneratedPlainKeys: 'id' | 'createdAt' | 'updatedAt';
    ForbiddenToUpdatePlainKeys: 'id' | 'createdAt' | 'updatedAt';
    ForbiddenToUpdateRelationKeys: null;
    UnselectedByDefaultPlainKeys: null;
  }
>;

type Config = RepoTypes['Config'];

export type OnePlainBehaviorToBeCreated =
  RepoTypes['OnePlainEntityToBeCreated'];
export type OnePlainBehaviorToBeUpdated =
  RepoTypes['OnePlainEntityToBeUpdated'];
export type OneBehaviorWithRelationsToBeUpdated =
  RepoTypes['OneEntityWithRelationsToBeUpdated'];
export type SelectedOnePlainBehavior = RepoTypes['SelectedOnePlainEntity'];
