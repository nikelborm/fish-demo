import { Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import {
  AccessEnum,
  AllowedFor,
  ApiController,
  ValidatedBody,
} from 'src/tools';
import type {
  CreateEventTypeDTO,
  CreateOneEventTypeResponse,
  GetOneEventTypeByIdResponseDTO,
  UpdateEventTypeDTO,
  UpdateOneEventTypeResponse,
} from 'src/types';
import { EventTypeUseCase } from './eventType.useCase';

@ApiController('eventType')
export class EventTypeController {
  constructor(private readonly eventTypeUseCase: EventTypeUseCase) {}

  @Post('createEventType')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createEventType(
    @ValidatedBody()
    createEventTypeDTO: CreateEventTypeDTO,
  ): Promise<CreateOneEventTypeResponse> {
    return await this.eventTypeUseCase.createKind(createEventTypeDTO);
  }

  @Get('/:eventTypeId')
  async findOneEventTypeById(
    @Param('eventTypeId', ParseIntPipe) eventTypeId: number,
  ): Promise<GetOneEventTypeByIdResponseDTO> {
    const eventType = await this.eventTypeUseCase.getOneById(eventTypeId);
    return eventType;
  }

  @Post('updateEventType')
  async updateEventType(
    @ValidatedBody()
    eventType: UpdateEventTypeDTO,
  ): Promise<UpdateOneEventTypeResponse> {
    return await this.eventTypeUseCase.updateKind(eventType);
  }

  @Delete(':eventTypeId')
  async deleteEventType(
    @Param('eventTypeId') eventTypeId: number,
  ): Promise<void> {
    return await this.eventTypeUseCase.deleteKind(eventTypeId);
  }
}
