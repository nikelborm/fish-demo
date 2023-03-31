import { Injectable } from '@nestjs/common';
import { InjectRepository /*getRepositoryToken*/ } from '@nestjs/typeorm';
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
import { Event } from '../model';
import { SelectedOnePlainEventType } from './eventType.repo';
import { SelectedOnePlainReservoir } from './reservoir.repo';

@Injectable()
export class EventRepo {
  constructor(
    @InjectRepository(Event)
    private readonly repo: Repository<Event>,
  ) {}

  getAll = getAllEntities(this.repo)<Config>();

  findOneById = async (
    id: number,
  ): Promise<RepoTypes['SelectedOnePlainEntity'] | null> =>
    await findOnePlainByIdentity(this.repo)<Config>()({ id });

  findOneByIdWithTypeAndReservoir = async (
    id: number,
  ): Promise<
    | (RepoTypes['SelectedOnePlainEntity'] & {
        eventType: SelectedOnePlainEventType;
        reservoir: SelectedOnePlainReservoir;
      })
    | null
  > => {
    return await this.repo.findOne({
      relations: { eventType: true, reservoir: true },
      where: { id },
    });
  };

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
  Event,
  {
    EntityName: 'Event';
    RequiredToCreateAndSelectRegularPlainKeys:
      | 'createdAt'
      | 'updatedAt'
      | 'eventTypeId'
      | 'completionTime'
      | 'reservoirId'
      | 'description';
    OptionalToCreateAndSelectRegularPlainKeys: null;

    ForbiddenToCreateGeneratedPlainKeys: 'id' | 'createdAt' | 'updatedAt';
    ForbiddenToUpdatePlainKeys: 'id' | 'createdAt' | 'updatedAt';
    ForbiddenToUpdateRelationKeys: null;
    UnselectedByDefaultPlainKeys: null;
  }
>;

type Config = RepoTypes['Config'];
export type SelectedOnePlainEvent = RepoTypes['SelectedOnePlainEntity'];
