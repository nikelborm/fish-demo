import { Injectable, NotFoundException } from '@nestjs/common';
import { messages } from 'src/config';
import type {
  CreateEventTypeDTO,
  CreateOneEventTypeResponse,
  UpdateEventTypeDTO,
  UpdateOneEventTypeResponse,
} from 'src/types';
import { repo } from '../infrastructure';

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
  ): Promise<repo.CreatedOnePlainEventType[]> {
    const insertedeventTypes = await this.eventTypeRepo.createManyPlain(
      eventTypes,
    );
    return insertedeventTypes;
  }

  async createKind(
    EventType: CreateEventTypeDTO,
  ): Promise<CreateOneEventTypeResponse> {
    const insertedeventType = await this.eventTypeRepo.createOnePlain(
      EventType,
    );
    return { EventType: insertedeventType };
  }

  async updateKind(
    EventType: UpdateEventTypeDTO,
  ): Promise<UpdateOneEventTypeResponse> {
    const updatedEventType = await this.eventTypeRepo.updateOnePlain(EventType);
    return updatedEventType;
  }

  async deleteKind(eventTypeId: number): Promise<void> {
    return await this.eventTypeRepo.delete(eventTypeId);
  }
}
