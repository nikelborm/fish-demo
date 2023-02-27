import { Post } from '@nestjs/common';
import { ApiController, ValidatedBody } from 'src/tools';
import { CreatePredictDTO, EmptyResponseDTO } from 'src/types';
import { PredictUseCase } from './predict.useCase';

@ApiController('predict')
export class PredictController {
  constructor(private readonly predictUseCase: PredictUseCase) {}

  @Post('createOne')
  // @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createPredict(
    @ValidatedBody()
    createPredictDTO: CreatePredictDTO,
  ): Promise<EmptyResponseDTO> {
    await this.predictUseCase.createPredict(createPredictDTO);
    return {};
  }
}
