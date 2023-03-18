import { BadRequestException, Injectable } from '@nestjs/common';
import { messages } from 'src/config';
import type {
  CreateOneTaskTimeRequestDTO,
  CreateOneTaskTimeResponseDTO,
} from 'src/types';
import { repo } from '../infrastructure';

@Injectable()
export class TaskTimeUseCase {
  constructor(private readonly taskTimeRepo: repo.TaskTimeRepo) {}

  async findMany(search?: string): Promise<repo.SelectedOnePlainTaskTime[]> {
    return await this.taskTimeRepo.getAll();
  }

  async getOneById(taskTimeId: number): Promise<repo.SelectedOnePlainTaskTime> {
    const taskTime = await this.taskTimeRepo.findOneById(taskTimeId);
    if (!taskTime)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(taskTimeId, 'taskTime'),
      );
    return taskTime;
  }

  async createTaskTime(
    taskTime: CreateOneTaskTimeRequestDTO,
  ): Promise<CreateOneTaskTimeResponseDTO> {
    return await this.taskTimeRepo.createOnePlain(taskTime);
  }

  async createManyTaskTimes(
    taskTimes: CreateOneTaskTimeRequestDTO[],
  ): Promise<CreateOneTaskTimeResponseDTO[]> {
    return await this.taskTimeRepo.createManyPlain(taskTimes);
  }

  async deleteOne(id: number): Promise<void> {
    await this.taskTimeRepo.deleteOneById(id);
  }
}
