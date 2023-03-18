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
import { TaskToReservoir } from '../model';

@Injectable()
export class TaskToReservoirRepo {
  constructor(
    @InjectRepository(TaskToReservoir)
    private readonly repo: Repository<TaskToReservoir>,
  ) {}

  getAll = getAllEntities(this.repo)<Config>();

  findOneByIdentity = findOnePlainByIdentity(this.repo)<Config>();

  createOnePlain = createOnePlain(this.repo)<Config>();
  createManyPlain = createManyPlain(this.repo)<Config>();

  updateManyPlain = updateManyPlain(this.repo)<Config>();
  updateOnePlain = updateOnePlain(this.repo)<Config>();

  updateManyWithRelations = updateManyWithRelations(this.repo)<Config>();
  updateOneWithRelations = updateOneWithRelations(this.repo)<Config>();

  deleteOne = deleteEntityByIdentity(this.repo)<Config>();
}

type RepoTypes = EntityRepoMethodTypes<
  TaskToReservoir,
  {
    EntityName: 'TaskToReservoir';

    RequiredToCreateAndSelectRegularPlainKeys: 'taskId' | 'reservoirId';

    OptionalToCreateAndSelectRegularPlainKeys: null;

    ForbiddenToCreateGeneratedPlainKeys: null;
    ForbiddenToUpdatePlainKeys: 'taskId' | 'reservoirId';
    ForbiddenToUpdateRelationKeys: null;
    UnselectedByDefaultPlainKeys: null;
  }
>;

type Config = RepoTypes['Config'];

export type OnePlainTaskToReservoirToBeCreated =
  RepoTypes['OnePlainEntityToBeCreated'];
export type OnePlainTaskToReservoirToBeUpdated =
  RepoTypes['OnePlainEntityToBeUpdated'];
export type OneTaskToReservoirWithRelationsToBeUpdated =
  RepoTypes['OneEntityWithRelationsToBeUpdated'];
export type SelectedOnePlainTaskToReservoir =
  RepoTypes['SelectedOnePlainEntity'];
