import { Injectable } from '@nestjs/common';
import { InjectRepository, /*getRepositoryToken*/ } from '@nestjs/typeorm';
import {
  createManyPlain,
  //createOnePlain,
  deleteEntityByIdentity,
  findOnePlainByIdentity,
  getAllEntities,
  updateManyPlain,
  updateManyWithRelations,
  updateOnePlain,
  updateOneWithRelations,
} from 'src/tools';
import type { CreateOneEventRequestDTO, EntityRepoMethodTypes } from 'src/types';
import { Repository } from 'typeorm';
import { Event, EventType } from '../model';
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
        eventType: SelectedOnePlainEventType
      } & {
        reservoir: SelectedOnePlainReservoir
      })
      | null
  > =>{
    return await this.repo.findOne({
      relations: { eventType: true,
                  reservoir: true,},
      where: { id },
    });
  };

  createOnePlain = async (event: CreateOneEventRequestDTO): Promise<SelectedOnePlainEvent> => {
    const eventTypeRepo = this.repo.manager.getRepository(EventType); //initialize the repo
    try{let eventType = await eventTypeRepo.findOneBy({ id: event.eventTypeId });
    if (!eventType) {
      throw new Error (`EventType with id ${event.eventTypeId} not found`)
    }
    const newEvent = this.repo.create(event);
    return newEvent;}
    catch (error){
      throw error;
    }// think how leave room for other errors here
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
