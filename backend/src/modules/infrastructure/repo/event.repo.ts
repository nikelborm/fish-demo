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
import { BasicEventInfoWithIdDTO, CreateOneEventRequestDTO } from 'src/types';
import { Between, Repository } from 'typeorm';
import { EventTypeRepo } from '.';
import { Event } from '../model';
import { SelectedOnePlainEventType } from './eventType.repo';
import { SelectedOnePlainReservoir } from './reservoir.repo';

@Injectable()
export class EventRepo {
  constructor(
    @InjectRepository(Event)
    private readonly repo: Repository<Event>,
    private readonly eventTypeRepo: EventTypeRepo,
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

  createOnePlain = async (
    request: CreateOneEventRequestDTO,
  ): Promise<BasicEventInfoWithIdDTO> => {
    let idToInsert = 0;
    const eventType = await this.eventTypeRepo.findOneByName(
      request.eventTypeName,
    );

    if (!eventType) {
      const newEventType = await this.eventTypeRepo.createOnePlain({
        name: request.eventTypeName,
        description: 'not set',
      });
      idToInsert = newEventType.id;
    } else {
      idToInsert = eventType.id;
    }

    const insertedEvent = await this.createOneWithId({
      eventTypeId: idToInsert,
      completionTime: request.completionTime,
      description: request.description,
      reservoirId: request.reservoirId,
    });

    return insertedEvent;
  };
  createOneWithId = createOnePlain(this.repo)<Config>();

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
