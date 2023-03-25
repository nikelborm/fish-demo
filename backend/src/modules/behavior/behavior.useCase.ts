import { BadRequestException, Injectable } from '@nestjs/common';
import { messages } from 'src/config';
import { isQueryFailedError } from 'src/tools';
import {
  CreateOneBehaviorRequestDTO,
  CreateOneBehaviorResponseDTO,
  PG_FOREIGN_KEY_CONSTRAINT_VIOLATION,
} from 'src/types';
import { repo } from '../infrastructure';

@Injectable()
export class BehaviorUseCase {
  constructor(
    private readonly behaviorRepo: repo.BehaviorRepo,
    private readonly behaviorTypeRepo: repo.BehaviorTypeRepo,
    private readonly alertRepo: repo.AlertRepo,
    private readonly alertTypeRepo: repo.AlertTypeRepo,
  ) {}

  async findMany(search?: string): Promise<repo.SelectedOnePlainBehavior[]> {
    return await this.behaviorRepo.getAll();
  }

  async getOneByIdWithReservoir(behaviorId: number): Promise<
    repo.SelectedOnePlainBehavior & {
      reservoir: repo.SelectedOnePlainReservoir;
    }
  > {
    const behavior = await this.behaviorRepo.findOneByIdWithReservoir(
      behaviorId,
    );
    if (!behavior)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(behaviorId, 'behavior'),
      );
    return behavior;
  }

  async createBehavior(
    behavior: CreateOneBehaviorRequestDTO,
  ): Promise<CreateOneBehaviorResponseDTO> {
    try {
      const createdBehavior = await this.behaviorRepo.createOnePlain(behavior);
      if (behavior.probability > 0.8)
        await this.#createAlertForExtremeBehavior(
          behavior.behaviorTypeId,
          behavior.reservoirId,
        );
      return createdBehavior;
    } catch (error: any) {
      if (isQueryFailedError(error))
        if (error.code === PG_FOREIGN_KEY_CONSTRAINT_VIOLATION)
          throw new BadRequestException(
            messages.repo.common.cantCreateFKDoNotExist('behavior'),
          );
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

  async #createAlertForExtremeBehavior(
    behaviorTypeId: number,
    reservoirId: number,
  ): Promise<void> {
    const behaviorType = await this.behaviorTypeRepo.findOneById(
      behaviorTypeId,
    );
    if (!behaviorType)
      throw new BadRequestException(
        messages.repo.common.cantCreateFKDoNotExist('behavior'),
      );
    const alertTypeDescription = `Probability of behavior type ${behaviorType.name} require attention`;
    let alertType = await this.alertTypeRepo.findOneByExactDescription(
      alertTypeDescription,
    );
    if (!alertType)
      alertType = await this.alertTypeRepo.createOnePlain({
        description: alertTypeDescription,
      });
    await this.alertRepo.createOnePlain({
      reservoir_id: reservoirId,
      alert_type_id: alertType.id,
      importance: 1,
    });
  }
}
