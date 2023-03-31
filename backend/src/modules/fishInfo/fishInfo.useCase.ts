import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { messages } from 'src/config';
import { isQueryFailedError } from 'src/tools';
import {
  CreateFishInfoDTO,
  CreateOneFishInfoResponse,
  PG_UNIQUE_CONSTRAINT_VIOLATION,
  UpdateFishInfoDTO,
  UpdateOneFishInfoResponse,
} from 'src/types';
import { model, repo } from '../infrastructure';

@Injectable()
export class FishInfoUseCase {
  constructor(private readonly fishInfoRepo: repo.FishInfoRepo) {}

  async getOneById(id: number): Promise<repo.SelectedOnePlainFishInfo> {
    const fishInfo = await this.fishInfoRepo.findOneById(id);

    if (!fishInfo)
      throw new NotFoundException(
        messages.repo.common.cantGetNotFoundById(id, 'fishInfo'),
      );

    return fishInfo;
  }

  async createManyFishInfos(
    fishInfos: CreateFishInfoDTO[],
  ): Promise<
    (CreateFishInfoDTO &
      Pick<model.FishInfo, 'id' | 'createdAt' | 'updatedAt'>)[]
  > {
    const insertedFishInfos = await this.fishInfoRepo.createManyPlain(
      fishInfos,
    );
    return insertedFishInfos;
  }

  async createFishInfo(
    fishInfo: CreateFishInfoDTO,
  ): Promise<CreateOneFishInfoResponse> {
    try {
      const insertedFishInfo = await this.fishInfoRepo.createOnePlain(fishInfo);
      return { fishInfo: insertedFishInfo };
    } catch (error) {
      if (isQueryFailedError(error))
        if (error.code === PG_UNIQUE_CONSTRAINT_VIOLATION)
          throw new BadRequestException(
            messages.repo.common.cantCreateUKDuplicate('fishInfo'),
          );
      throw error;
    }
  }

  async updateFishInfo({
    id,
    ...rest
  }: UpdateFishInfoDTO): Promise<UpdateOneFishInfoResponse> {
    const updatedFishInfo = await this.fishInfoRepo.updateOnePlain(
      { id },
      rest,
    );
    return updatedFishInfo;
  }

  async deleteFishInfo(fishInfoId: number): Promise<void> {
    return await this.fishInfoRepo.deleteOneById(fishInfoId);
  }
}
