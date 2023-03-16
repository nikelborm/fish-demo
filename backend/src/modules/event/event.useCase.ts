import { BadRequestException, Injectable } from '@nestjs/common';
import { messages } from 'src/config';
import type { CreateOneEventRequestDTO } from 'src/types';
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

  async createEvent(
    event: CreateOneEventRequestDTO,
  ): Promise<repo.CreateOneEventResponseDTO> {
    return await this.eventRepo.createOnePlain(event);
  }

  async deleteOne(id: number): Promise<void> {
    await this.eventRepo.deleteOneById(id);
  }
}
