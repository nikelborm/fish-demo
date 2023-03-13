import { Injectable, NotFoundException } from '@nestjs/common';
import { messages } from 'src/config';
import type {
  CreateFishKindDTO,
  CreateOneFishKindResponse,
  UpdateFishKindDTO,
  UpdateOneFishKindResponse,
} from 'src/types';
import { model, repo } from '../infrastructure';

@Injectable()
export class FishKindUseCase {
  constructor(private readonly fishKindRepo: repo.FishKindRepo) {}

  async getOneById(id: number): Promise<repo.SelectedOnePlainFishKind> {
    const fishKind = await this.fishKindRepo.findOneById(id);

    if (!fishKind)
      throw new NotFoundException(
        messages.repo.common.cantGetNotFoundById(id, 'fishKind'),
      );

    return fishKind;
  }

  async createManyKinds(
    fishKinds: CreateFishKindDTO[],
  ): Promise<
    (CreateFishKindDTO &
      Pick<model.FishKind, 'id' | 'createdAt' | 'updatedAt'>)[]
  > {
    const insertedFishKinds = await this.fishKindRepo.createManyPlain(
      fishKinds,
    );
    return insertedFishKinds;
  }

  async createKind(
    fishKind: CreateFishKindDTO,
  ): Promise<CreateOneFishKindResponse> {
    const insertedFishKind = await this.fishKindRepo.createOnePlain(fishKind);
    return { fishKind: insertedFishKind };
  }

  async updateKind({
    id,
    ...rest
  }: UpdateFishKindDTO): Promise<UpdateOneFishKindResponse> {
    const updatedFishKind = await this.fishKindRepo.updateOnePlain(
      { id },
      rest,
    );
    return updatedFishKind;
  }

  async deleteKind(fishKindId: number): Promise<void> {
    return await this.fishKindRepo.deleteOneById(fishKindId);
  }
}
