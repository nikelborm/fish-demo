import { BadRequestException, Injectable } from '@nestjs/common';
import { messages } from 'src/config';
import type {
  CreateOneTaskRequestDTO,
  CreateOneTaskResponseDTO,
} from 'src/types';
import { repo } from '../infrastructure';

@Injectable()
export class TaskUseCase {
  constructor(private readonly taskRepo: repo.TaskRepo) {}

  async findMany(search?: string): Promise<repo.SelectedOnePlainTask[]> {
    return await this.taskRepo.getAll();
  }

  async getOneById(taskId: number): Promise<repo.SelectedOnePlainTask> {
    const task = await this.taskRepo.findOneById(taskId);
    if (!task)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(taskId, 'task'),
      );
    return task;
  }

  async createTask(
    task: CreateOneTaskRequestDTO,
  ): Promise<CreateOneTaskResponseDTO> {
    return await this.taskRepo.createOnePlain(task);
  }

  async createManyTasks(
    tasks: CreateOneTaskRequestDTO[],
  ): Promise<CreateOneTaskResponseDTO[]> {
    return await this.taskRepo.createManyPlain(tasks);
  }

  async deleteOne(id: number): Promise<void> {
    await this.taskRepo.deleteOneById(id);
  }
}
