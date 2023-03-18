import { Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import {
  AccessEnum,
  AllowedFor,
  ApiController,
  AuthorizedOnly,
  ValidatedBody,
} from 'src/tools';
import {
  CreateOneTaskResponseDTO,
  CreateManyTasksResponseDTO,
  CreateOneTaskRequestDTO,
  CreateManyTasksRequestDTO,
  DeleteEntityByIdDTO,
  EmptyResponseDTO,
  FindManyTasksResponseDTO,
  GetOneTaskByIdResponseDTO,
} from 'src/types';
import { TaskUseCase } from './task.useCase';

@ApiController('task')
export class TaskController {
  constructor(private readonly taskUseCase: TaskUseCase) {}

  @Get('all')
  @AuthorizedOnly()
  async findManyTasks(
    @Query('search') search?: string,
  ): Promise<FindManyTasksResponseDTO> {
    const tasks = await this.taskUseCase.findMany(search);
    return {
      tasks,
    };
  }

  @Get('/:taskId')
  @AuthorizedOnly()
  async getOneTaskById(
    @Param('taskId', ParseIntPipe) taskId: number,
  ): Promise<GetOneTaskByIdResponseDTO> {
    return await this.taskUseCase.getOneById(taskId);
  }

  @Post('create')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createTask(
    @ValidatedBody()
    createTaskDTO: CreateOneTaskRequestDTO,
  ): Promise<CreateOneTaskResponseDTO> {
    return await this.taskUseCase.createTask(createTaskDTO);
  }

  @Post('createMany')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createTasks(
    @ValidatedBody()
    { tasks }: CreateManyTasksRequestDTO,
  ): Promise<CreateManyTasksResponseDTO> {
    return {
      createdTasks: await this.taskUseCase.createManyTasks(tasks),
    };
  }

  @Post('deleteById')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async deleteTask(
    @ValidatedBody()
    { id }: DeleteEntityByIdDTO,
  ): Promise<EmptyResponseDTO> {
    await this.taskUseCase.deleteOne(id);
    return {};
  }
}
