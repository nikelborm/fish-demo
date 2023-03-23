import { BadRequestException, Injectable } from '@nestjs/common';
import { messages } from 'src/config';
import type {
  CreateOneEventRequestDTO,
  CreateOneEventResponseDTO,
} from 'src/types';
import { repo } from '../infrastructure';

@Injectable()
export class EventUseCase {
  constructor(private readonly eventRepo: repo.EventRepo) {}

  async findMany(search?: string): Promise<repo.SelectedOnePlainEvent[]> {
    return await this.eventRepo.getAll();
  }

  async getOneById(eventId: number): Promise<repo.SelectedOnePlainEvent> {
    const event = await this.eventRepo.findOneById(eventId);
    if (!event)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(eventId, 'event'),
      );
    return event;
  }

  async getOneByIdWithEventType(id: number): Promise<
    repo.SelectedOnePlainEvent & {
      eventType: repo.SelectedOnePlainEventType;
    }
  > {
    const event = await this.eventRepo.findOneByIdWithEventType(id);

    if (!event)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(id, 'event'),
      );

    return event;
  }

  async getOneByData(
    createdAt: Date,
  ): Promise<repo.SelectedOnePlainEvent[] | null> {
    return await this.eventRepo.findByData(createdAt);
  }

  async createEvent(
    event: CreateOneEventRequestDTO,
  ): Promise<CreateOneEventResponseDTO> {
    const insertedEvent = await this.eventRepo.createOnePlain(event);
    return { Event: insertedEvent };
  }

  async deleteOne(id: number): Promise<void> {
    await this.eventRepo.deleteOneById(id);
  }
}
