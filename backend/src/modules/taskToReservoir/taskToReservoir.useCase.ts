import { BadRequestException, Injectable } from '@nestjs/common';
import { messages } from 'src/config';
import type { CreateOneTaskToReservoirRequestDTO } from 'src/types';
import { repo } from '../infrastructure';

@Injectable()
export class TaskToReservoirUseCase {
  constructor(private readonly taskToReservoirRepo: repo.TaskToReservoirRepo) {}

  async getAll(): Promise<repo.SelectedOnePlainTaskToReservoir[]> {
    return await this.taskToReservoirRepo.getAll();
  }

  async getOneById(
    taskId: number,
    reservoirId: number,
  ): Promise<repo.SelectedOnePlainTaskToReservoir> {
    const taskToReservoir = await this.taskToReservoirRepo.findOneByIdentity({
      taskId,
      reservoirId,
    });
    if (!taskToReservoir)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(
          `taskId=${taskId},reservoirId=${reservoirId}`,
          'taskToReservoir',
        ),
      );
    return taskToReservoir;
  }

  async createTaskToReservoir(
    taskToReservoir: CreateOneTaskToReservoirRequestDTO,
  ): Promise<repo.OnePlainTaskToReservoirToBeCreated> {
    return await this.taskToReservoirRepo.createOnePlain(taskToReservoir);
  }

  async createManyTaskToReservoirs(
    taskToReservoirs: CreateOneTaskToReservoirRequestDTO[],
  ): Promise<repo.OnePlainTaskToReservoirToBeCreated[]> {
    return await this.taskToReservoirRepo.createManyPlain(taskToReservoirs);
  }

  async deleteOne(identity: {
    taskId: number;
    reservoirId: number;
  }): Promise<void> {
    await this.taskToReservoirRepo.deleteOne(identity);
  }
}
