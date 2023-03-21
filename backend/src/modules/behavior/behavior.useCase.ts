import { BadRequestException, Injectable } from '@nestjs/common';
import { messages } from 'src/config';
import type {
  CreateOneBehaviorRequestDTO,
  CreateOneBehaviorResponseDTO,
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
    return await this.behaviorRepo.createOnePlain(behavior);
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
