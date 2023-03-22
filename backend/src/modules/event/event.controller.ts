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
} from 'src/types';
import { EventUseCase } from './event.useCase';

@ApiController('event')
export class EventController {
  constructor(private readonly eventUseCase: EventUseCase) {}

  @Get('all')
  @AuthorizedOnly()
  async findManyEvents(
    @Query('search') search?: string,
  ): Promise<(FindManyEventsResponseDTO)> {
    const events = await this.eventUseCase.findMany(search);
    return {
      events,
    };
  }

  @Get('/:eventId')
  @AuthorizedOnly()
  //async getOneEventById(
  async getOneEventByIdWithTypeAndReservoir(
    @Param('eventId', ParseIntPipe) eventId: number,
  ): Promise<(GetOneEventByIdResponseDTO & {
    eventType: GetOneEventTypeByIdResponseDTO;
  } & {
    reservoir: GetOneReservoirByIdResponseDTO;
  })> {
  //  return await this.eventUseCase.getOneById(
    const event = await this.eventUseCase.getOneByIdWithTypeAndReservoir(eventId);
    return event;
  }

  @Post('createEvent')
  async createEvent(
    @ValidatedBody()
    createEventDTO: CreateOneEventRequestDTO,
  ): Promise<CreateOneEventResponseDTO> {
    try {
      return await this.eventUseCase.createEvent(createEventDTO);
    } catch (error) {
      if (error instanceof Error) {  //I had an error that error is of type unknown so I check its type
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred.');
      }
    }
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
