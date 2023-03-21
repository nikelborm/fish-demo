import { Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import {
  AccessEnum,
  AllowedFor,
  ApiController,
  ValidatedBody,
} from 'src/tools';
import {
  CreateBehaviorTypeDTO,
  CreateOneBehaviorTypeResponse,
  GetOneBehaviorTypeByIdResponseDTO,
  UpdateBehaviorTypeDTO,
  UpdateOneBehaviorTypeResponse,
} from 'src/types';
import { BehaviorTypeUseCase } from './behaviorType.useCase';

@ApiController('behaviorType')
export class BehaviorTypeController {
  constructor(private readonly behaviorTypeUseCase: BehaviorTypeUseCase) {}

  @Post('create')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createBehaviorType(
    @ValidatedBody()
    createBehaviorTypeDTO: CreateBehaviorTypeDTO,
  ): Promise<CreateOneBehaviorTypeResponse> {
    return await this.behaviorTypeUseCase.createBehaviorType(
      createBehaviorTypeDTO,
    );
  }

  @Get('/:behaviorTypeId')
  async findOneBehaviorTypeById(
    @Param('behaviorTypeId', ParseIntPipe) behaviorTypeId: number,
  ): Promise<GetOneBehaviorTypeByIdResponseDTO> {
    const behaviorType = await this.behaviorTypeUseCase.getOneById(
      behaviorTypeId,
    );
    return behaviorType;
  }

  @Post('updateBehaviorType')
  async updateBehaviorType(
    @ValidatedBody()
    behaviorType: UpdateBehaviorTypeDTO,
  ): Promise<UpdateOneBehaviorTypeResponse> {
    return await this.behaviorTypeUseCase.updateKind(behaviorType);
  }

  @Delete(':behaviorTypeId')
  async deleteBehaviorType(
    @Param('behaviorTypeId') behaviorTypeId: number,
  ): Promise<void> {
    return await this.behaviorTypeUseCase.deleteKind(behaviorTypeId);
  }
}
