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
import { Between, Repository } from 'typeorm';
import { Alert } from '../model';
import { SelectedOnePlainAlertType } from './alertType.repo';
import { SelectedOnePlainReservoir } from './reservoir.repo';

@Injectable()
export class AlertRepo {
  constructor(
    @InjectRepository(Alert)
    private readonly repo: Repository<Alert>,
  ) {}

  getAll = getAllEntities(this.repo)<Config>();

  findOneById = async (
    id: number,
  ): Promise<RepoTypes['SelectedOnePlainEntity'] | null> =>
    await findOnePlainByIdentity(this.repo)<Config>()({ id });

  findByData = async (
    createdAt: Date,
  ): Promise<RepoTypes['SelectedOnePlainEntity'][] | null> => {
    const startDate = new Date(createdAt);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(createdAt);
    endDate.setHours(23, 59, 59, 999);
    return await this.repo.find({
      where: { createdAt: Between(startDate, endDate) },
    });
  };

  findOneByIdWithAlertTypeAndReservoir = async (
    id: number,
  ): Promise<
    | (RepoTypes['SelectedOnePlainEntity'] & {
        alertType: SelectedOnePlainAlertType;
        reservoir: SelectedOnePlainReservoir;
      })
    | null
  > => {
    return await this.repo.findOne({
      relations: { alertType: true, reservoir: true },
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
  Alert,
  {
    EntityName: 'Alert';
    RequiredToCreateAndSelectRegularPlainKeys:
      | 'createdAt'
      | 'updatedAt'
      | 'id'
      | 'reservoir_id'
      | 'alert_type_id'
      | 'importance';
    OptionalToCreateAndSelectRegularPlainKeys: null;

    ForbiddenToCreateGeneratedPlainKeys: 'id' | 'createdAt' | 'updatedAt';
    ForbiddenToUpdatePlainKeys: 'id' | 'createdAt' | 'updatedAt';
    ForbiddenToUpdateRelationKeys: null;
    UnselectedByDefaultPlainKeys: null;
  }
>;

type Config = RepoTypes['Config'];

export type OnePlainAlertToBeCreated = RepoTypes['OnePlainEntityToBeCreated'];
export type OnePlainAlertToBeUpdated = RepoTypes['OnePlainEntityToBeUpdated'];
export type OneAlertWithRelationsToBeUpdated =
  RepoTypes['OneEntityWithRelationsToBeUpdated'];
export type SelectedOnePlainAlert = RepoTypes['SelectedOnePlainEntity'];
