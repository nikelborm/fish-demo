import { Injectable, NotFoundException } from '@nestjs/common';
import { messages } from 'src/config';
import type {
  CreateEventTypeDTO,
  CreateOneEventTypeResponse,
  UpdateEventTypeDTO,
  UpdateOneEventTypeResponse,
} from 'src/types';
import { model, repo } from '../infrastructure';

@Injectable()
export class EventTypeUseCase {
  constructor(private readonly eventTypeRepo: repo.EventTypeRepo) {}

  async getOneById(id: number): Promise<repo.SelectedOnePlainEventType> {
    const eventType = await this.eventTypeRepo.findOneById(id);

    if (!eventType)
      throw new NotFoundException(
        messages.repo.common.cantGetNotFoundById(id, 'eventType'),
      );

    return eventType;
  }

  async createManyKinds(
    eventTypes: CreateEventTypeDTO[],
  ): Promise<
    Required<
      CreateEventTypeDTO &
        Pick<model.EventType, 'id' | 'createdAt' | 'updatedAt'>
    >[]
  > {
    const insertedEventTypes = await this.eventTypeRepo.createManyPlain(
      eventTypes,
    );
    return insertedEventTypes;
  }

  async createKind(
    EventType: CreateEventTypeDTO,
  ): Promise<CreateOneEventTypeResponse> {
    const insertedEventType = await this.eventTypeRepo.createOnePlain(
      EventType,
    );
    return { EventType: insertedEventType };
  }

  async updateKind({
    id,
    ...rest
  }: UpdateEventTypeDTO): Promise<UpdateOneEventTypeResponse> {
    const updatedEventType = await this.eventTypeRepo.updateOnePlain(
      { id },
      rest,
    );
    return updatedEventType;
  }

  async deleteKind(eventTypeId: number): Promise<void> {
    return await this.eventTypeRepo.deleteOneById(eventTypeId);
  }
}
