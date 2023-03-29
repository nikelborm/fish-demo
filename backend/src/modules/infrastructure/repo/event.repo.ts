import { Injectable } from '@nestjs/common';
import { InjectRepository, /*getRepositoryToken*/ } from '@nestjs/typeorm';
import {
  createManyPlain,
  deleteEntityByIdentity,
  findOnePlainByIdentity,
  getAllEntities,
  updateManyPlain,
  updateManyWithRelations,
  updateOnePlain,
  updateOneWithRelations,
} from 'src/tools';
import { CreateOneEventRequestDTO, CreateOneEventDTO, EntityRepoMethodTypes, BasicEventInfoWithIdDTO } from 'src/types';
import { Repository } from 'typeorm';
import { Event } from '../model';
import { SelectedOnePlainEventType } from './eventType.repo';
import { SelectedOnePlainReservoir } from './reservoir.repo';
import { EventTypeRepo } from '.';

@Injectable()
export class EventRepo {
  constructor(
    @InjectRepository(Event)
    private readonly repo: Repository<Event>,
    private readonly eventTypeRepo: EventTypeRepo
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

  createOnePlain = async (request: CreateOneEventRequestDTO):
  Promise< BasicEventInfoWithIdDTO> => {
    const eventType = await this.eventTypeRepo.findOneByName(request.eventTypeName);
    let idToInsert = 0;
    if (!eventType) {
      // If the event type doesn't exist, create a new one
      const eventTypeToInsert = { name: request.eventTypeName,
                                  description: 'not set',
                                icon: '',}; //what to do with the icon
      const newEventType = await this.eventTypeRepo.createOnePlain(eventTypeToInsert);
      idToInsert = newEventType.id;
    } else {
      // If the event type exists, use its ID
      idToInsert = eventType.id;
    }
    const eventToInsert = new CreateOneEventDTO;
    eventToInsert.eventTypeId = idToInsert;
    eventToInsert.completionTime = request.completionTime;
    eventToInsert.description = request.description;
    eventToInsert.reservoirId = request.reservoirId;

    const insertedEvent = await this.repo.create(eventToInsert);
    const response = new BasicEventInfoWithIdDTO();
    response.reservoirId = insertedEvent.reservoirId;
    response.id = insertedEvent.id;
    response.eventTypeId = insertedEvent.eventTypeId;
    response.description = insertedEvent.description;
    response.completionTime = insertedEvent.completionTime;
    return response;
  }
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
