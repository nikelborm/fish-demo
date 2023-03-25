import { Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import {
  AccessEnum,
  AllowedFor,
  ApiController,
  AuthorizedOnly,
  ValidatedBody,
} from 'src/tools';
import {
  CreateOneEventResponseDTO,
  CreateOneEventRequestDTO,
  DeleteEntityByIdDTO,
  EmptyResponseDTO,
  FindManyEventsResponseDTO,
  GetOneEventByIdResponseDTO,
  GetOneEventTypeByIdResponseDTO,
  GetOneReservoirByIdResponseDTO,
  GetOneEventForManyResponseDTO,
} from 'src/types';
import { EventUseCase } from './event.useCase';

@ApiController('event')
export class EventController {
  constructor(private readonly eventUseCase: EventUseCase) {}

  @Get('all')
  @AuthorizedOnly()
  async findManyEvents(
    @Query('search') search?: string,
  ): Promise<FindManyEventsResponseDTO> {
    const events = await this.eventUseCase.findMany(search);
    return {
      events,
    };
  }

  @Get('/:createdAt')
  async findEventsByData(
    @Param('createdAt')
    createdAt: Date,
  ): Promise<GetOneEventForManyResponseDTO[] | null> {
    const event = await this.eventUseCase.getOneByData(createdAt);
    return event;
  }

  @Get('/:eventId')
  @AuthorizedOnly()
  //async getOneEventById(
  async getOneEventByIdWithTypeAndReservoir(
    @Param('eventId', ParseIntPipe) eventId: number,
  ): Promise<
    GetOneEventByIdResponseDTO & {
      eventType: GetOneEventTypeByIdResponseDTO;
      reservoir: GetOneReservoirByIdResponseDTO;
    }
  > {
    //  return await this.eventUseCase.getOneById(
    const event = await this.eventUseCase.getOneByIdWithTypeAndReservoir(
      eventId,
    );
    return event;
  }

  @Post('createEvent')
  async createEvent(
    @ValidatedBody()
    createEventDTO: CreateOneEventRequestDTO,
  ): Promise<CreateOneEventResponseDTO> {
    return await this.eventUseCase.createEvent(createEventDTO);
  }

  @Delete('deleteById')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async deleteEvent(
    @ValidatedBody()
    { id }: DeleteEntityByIdDTO,
  ): Promise<EmptyResponseDTO> {
    await this.eventUseCase.deleteOne(id);
    return {};
  }
}
