import { Get, Post } from '@nestjs/common';
import {
  AccessEnum,
  AllowedFor,
  ApiController,
  AuthorizedOnly,
  ValidatedBody,
} from 'src/tools';
import {
  CreateManyTaskToReservoirsRequestDTO,
  CreateManyTaskToReservoirsResponseDTO,
  CreateOneTaskToReservoirRequestDTO,
  CreateOneTaskToReservoirResponseDTO,
  DeleteOneTaskToReservoirRequestDTO,
  EmptyResponseDTO,
  FindManyTaskToReservoirsResponseDTO,
} from 'src/types';
import { TaskToReservoirUseCase } from './taskToReservoir.useCase';

@ApiController('taskToReservoir')
export class TaskToReservoirController {
  constructor(
    private readonly taskToReservoirUseCase: TaskToReservoirUseCase,
  ) {}

  @Get('all')
  @AuthorizedOnly()
  async getAllTaskToReservoirs(): Promise<FindManyTaskToReservoirsResponseDTO> {
    const taskToReservoirs = await this.taskToReservoirUseCase.getAll();
    return {
      taskToReservoirs,
    };
  }

  @Post('create')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createTaskToReservoir(
    @ValidatedBody()
    createTaskToReservoirDTO: CreateOneTaskToReservoirRequestDTO,
  ): Promise<CreateOneTaskToReservoirResponseDTO> {
    return await this.taskToReservoirUseCase.createTaskToReservoir(
      createTaskToReservoirDTO,
    );
  }

  @Post('createMany')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createTaskToReservoirs(
    @ValidatedBody()
    { taskToReservoirs }: CreateManyTaskToReservoirsRequestDTO,
  ): Promise<CreateManyTaskToReservoirsResponseDTO> {
    return {
      createdTaskToReservoirs:
        await this.taskToReservoirUseCase.createManyTaskToReservoirs(
          taskToReservoirs,
        ),
    };
  }

  @Post('deleteById')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async deleteTaskToReservoir(
    @ValidatedBody()
    identity: DeleteOneTaskToReservoirRequestDTO,
  ): Promise<EmptyResponseDTO> {
    await this.taskToReservoirUseCase.deleteOne(identity);
    return {};
  }
}
