import { BadRequestException, Injectable } from '@nestjs/common';
import { messages } from 'src/config';
import { isQueryFailedError } from 'src/tools';
import {
  CreateOneEventRequestDTO,
  CreateOneEventResponseDTO,
  PG_FOREIGN_KEY_CONSTRAINT_VIOLATION,
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

  async getOneByData(
    createdAt: Date,
  ): Promise<repo.SelectedOnePlainEvent[] | null> {
    return await this.eventRepo.findByData(createdAt);
  }

  async getOneByIdWithTypeAndReservoir(id: number): Promise<
    repo.SelectedOnePlainEvent & {
      eventType: repo.SelectedOnePlainEventType;
      reservoir: repo.SelectedOnePlainReservoir;
    }
  > {
    const event = await this.eventRepo.findOneByIdWithTypeAndReservoir(id);

    if (!event)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(id, 'event'),
      );

    return event;
  }

  async createEvent(
    event: CreateOneEventRequestDTO,
  ): Promise<CreateOneEventResponseDTO> {
    try {
      const insertedEvent = await this.eventRepo.createOnePlain(event);
      return { event: insertedEvent };
    } catch (error: any) {
      if (isQueryFailedError(error))
        if (error.code === PG_FOREIGN_KEY_CONSTRAINT_VIOLATION)
          throw new BadRequestException(
            messages.repo.common.cantCreateFKDoNotExist('event'),
          );
      throw error;
    }
  }

  async deleteOne(id: number): Promise<void> {
    await this.eventRepo.deleteOneById(id);
  }
}
