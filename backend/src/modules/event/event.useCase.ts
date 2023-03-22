import { BadRequestException, Injectable } from '@nestjs/common';
import { messages } from 'src/config';
import type { CreateOneEventRequestDTO, CreateOneEventResponseDTO } from 'src/types';
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

  async getOneByIdWithTypeAndReservoir(id: number): Promise<
    repo.SelectedOnePlainEvent & {
      eventType: repo.SelectedOnePlainEventType;
    } & {
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
      return { Event: insertedEvent };
    } catch (error) {
      if (error instanceof Error) {  //I had an error that error is of type unknown so I check its type
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred.');
      }
    }
  }

  async deleteOne(id: number): Promise<void> {
    await this.eventRepo.deleteOneById(id);
  }
}
