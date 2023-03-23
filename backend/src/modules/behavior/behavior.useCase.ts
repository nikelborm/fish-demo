import { BadRequestException, Injectable } from '@nestjs/common';
import { messages } from 'src/config';
import { isQueryFailedError } from 'src/tools';
import {
  CreateOneBehaviorRequestDTO,
  CreateOneBehaviorResponseDTO,
  PG_FOREIGN_KEY_CONSTRAINT_VIOLATION
} from 'src/types';
import { repo } from '../infrastructure';

@Injectable()
export class BehaviorUseCase {
  constructor(private readonly behaviorRepo: repo.BehaviorRepo) {}

  async findMany(search?: string): Promise<repo.SelectedOnePlainBehavior[]> {
    return await this.behaviorRepo.getAll();
  }

  async getOneById(behaviorId: number): Promise<repo.SelectedOnePlainBehavior> {
    const behavior = await this.behaviorRepo.findOneById(behaviorId);
    if (!behavior)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(behaviorId, 'behavior'),
      );
    return behavior;
  }

  async createBehavior(
    behavior: CreateOneBehaviorRequestDTO,
  ): Promise<CreateOneBehaviorResponseDTO> {
    try{
    return await this.behaviorRepo.createOnePlain(behavior);
    } catch (error: any) {
      if (isQueryFailedError(error))
        if (error.code === PG_FOREIGN_KEY_CONSTRAINT_VIOLATION)
          throw new BadRequestException(messages.repo.common.cantCreateFKDoNotExist(behavior, 'behavior'));
      throw error;
    }
  }

  async createManyBehaviors(
    behaviors: CreateOneBehaviorRequestDTO[],
  ): Promise<CreateOneBehaviorResponseDTO[]> {
    return await this.behaviorRepo.createManyPlain(behaviors);
  }

  async deleteOne(id: number): Promise<void> {
    await this.behaviorRepo.deleteOneById(id);
  }
}
