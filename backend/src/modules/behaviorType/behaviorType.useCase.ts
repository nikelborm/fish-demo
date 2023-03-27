import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { messages } from 'src/config';
import { isQueryFailedError } from 'src/tools';
import {
  CreateBehaviorTypeDTO,
  CreateOneBehaviorTypeResponse,
  PG_UNIQUE_CONSTRAINT_VIOLATION,
  UpdateBehaviorTypeDTO,
  UpdateOneBehaviorTypeResponse,
} from 'src/types';
import { model, repo } from '../infrastructure';

@Injectable()
export class BehaviorTypeUseCase {
  fishInfoRepo: any;
  constructor(private readonly behaviorTypeRepo: repo.BehaviorTypeRepo) {}

  async getOneById(id: number): Promise<repo.SelectedOnePlainBehaviorType> {
    const behaviorType = await this.behaviorTypeRepo.findOneById(id);

    if (!behaviorType)
      throw new NotFoundException(
        messages.repo.common.cantGetNotFoundById(id, 'behaviorType'),
      );

    return behaviorType;
  }

  async getOneByIdWithInfo(id: number): Promise<
    repo.SelectedOnePlainFishInfo & {
      fishInfo: repo.SelectedOnePlainEventType;
    }
  > {
    const behaviorType = await this.fishInfoRepo.findOneByIdWithInfo(id);

    if (!behaviorType)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(id, 'event'),
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
    try {
      const insertedBehaviorType = await this.behaviorTypeRepo.createOnePlain(
        BehaviorType,
      );
      return { BehaviorType: insertedBehaviorType };
    } catch (error) {
      if (isQueryFailedError(error))
        if (error.code === PG_UNIQUE_CONSTRAINT_VIOLATION)
          throw new BadRequestException(
            messages.repo.common.cantCreateUKDuplicate('behaviorType'),
          );
      throw error;
    }
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
