import { Injectable, NotFoundException } from '@nestjs/common';
import { messages } from 'src/config';
import { repo } from '../infrastructure';

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
}
