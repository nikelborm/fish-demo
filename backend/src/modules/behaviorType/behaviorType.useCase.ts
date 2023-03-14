import { Injectable, NotFoundException } from '@nestjs/common';
import { messages } from 'src/config';
import type {
  CreateBehaviorTypeDTO,
  CreateOneBehaviorTypeResponse,
  UpdateBehaviorTypeDTO,
  UpdateOneBehaviorTypeResponse,
} from 'src/types';
import { model, repo } from '../infrastructure';

@Injectable()
export class BehaviorTypeUseCase {
  constructor(private readonly behaviorTypeRepo: repo.BehaviorTypeRepo) {}

  async getOneById(id: number): Promise<repo.SelectedOnePlainBehaviorType> {
    const behaviorType = await this.behaviorTypeRepo.findOneById(id);

    if (!behaviorType)
      throw new NotFoundException(
        messages.repo.common.cantGetNotFoundById(id, 'behaviorType'),
      );

    return behaviorType;
  }

  async createManyKinds(
    behaviorTypes: CreateBehaviorTypeDTO[],
  ): Promise<
    Required<
      CreateBehaviorTypeDTO &
        Pick<model.BehaviorType, 'id' | 'createdAt' | 'updatedAt'>
    >[]
  > {
    const insertedBehaviorTypes = await this.behaviorTypeRepo.createManyPlain(
      behaviorTypes,
    );
    return insertedBehaviorTypes;
  }

  async createBehaviorType(
    BehaviorType: CreateBehaviorTypeDTO,
  ): Promise<CreateOneBehaviorTypeResponse> {
    const insertedBehaviorType = await this.behaviorTypeRepo.createOnePlain(
      BehaviorType,
    );
    return { BehaviorType: insertedBehaviorType };
  }

  async updateKind({
    id,
    ...rest
  }: UpdateBehaviorTypeDTO): Promise<UpdateOneBehaviorTypeResponse> {
    const updatedBehaviorType = await this.behaviorTypeRepo.updateOnePlain(
      { id },
      rest,
    );
    return updatedBehaviorType;
  }

  async deleteKind(behaviorTypeId: number): Promise<void> {
    return await this.behaviorTypeRepo.deleteOneById(behaviorTypeId);
  }
}
