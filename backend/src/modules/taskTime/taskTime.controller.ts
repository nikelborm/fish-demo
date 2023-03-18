import { Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import {
  AccessEnum,
  AllowedFor,
  ApiController,
  AuthorizedOnly,
  ValidatedBody,
} from 'src/tools';
import {
  CreateOneTaskTimeResponseDTO,
  CreateManyTaskTimesResponseDTO,
  CreateOneTaskTimeRequestDTO,
  CreateManyTaskTimesRequestDTO,
  DeleteEntityByIdDTO,
  EmptyResponseDTO,
  FindManyTaskTimesResponseDTO,
  GetOneTaskTimeByIdResponseDTO,
} from 'src/types';
import { TaskTimeUseCase } from './taskTime.useCase';

@ApiController('taskTime')
export class TaskTimeController {
  constructor(private readonly taskTimeUseCase: TaskTimeUseCase) {}

  @Get('all')
  @AuthorizedOnly()
  async findManyTaskTimes(
    @Query('search') search?: string,
  ): Promise<FindManyTaskTimesResponseDTO> {
    const taskTimes = await this.taskTimeUseCase.findMany(search);
    return {
      taskTimes,
    };
  }

  @Get('/:taskTimeId')
  @AuthorizedOnly()
  async getOneTaskTimeById(
    @Param('taskTimeId', ParseIntPipe) taskTimeId: number,
  ): Promise<GetOneTaskTimeByIdResponseDTO> {
    return await this.taskTimeUseCase.getOneById(
      taskTimeId,
    );
  }

  @Post('create')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createTaskTime(
    @ValidatedBody()
    createTaskTimeDTO: CreateOneTaskTimeRequestDTO,
  ): Promise<CreateOneTaskTimeResponseDTO> {
    return await this.taskTimeUseCase.createTaskTime(createTaskTimeDTO);
  }

  @Post('createMany')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createTaskTimes(
    @ValidatedBody()
    { taskTimes }: CreateManyTaskTimesRequestDTO,
  ): Promise<CreateManyTaskTimesResponseDTO> {
    return {
      createdTaskTimes: await this.taskTimeUseCase.createManyTaskTimes(taskTimes),
    };
  }

  @Post('deleteById')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async deleteTaskTime(
    @ValidatedBody()
    { id }: DeleteEntityByIdDTO,
  ): Promise<EmptyResponseDTO> {
    await this.taskTimeUseCase.deleteOne(id);
    return {};
  }
}
