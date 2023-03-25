import { Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import {
  AccessEnum,
  AllowedFor,
  ApiController,
  AuthorizedOnly,
  ValidatedBody,
} from 'src/tools';
import {
  CreateOneBehaviorResponseDTO,
  CreateManyBehaviorsResponseDTO,
  CreateOneBehaviorRequestDTO,
  CreateManyBehaviorsRequestDTO,
  DeleteEntityByIdDTO,
  EmptyResponseDTO,
  FindManyBehaviorsResponseDTO,
  GetOneBehaviorByIdResponseDTO,
  GetOneReservoirByIdResponseDTO,
} from 'src/types';
import { BehaviorUseCase } from './behavior.useCase';

@ApiController('behavior')
export class BehaviorController {
  constructor(private readonly behaviorUseCase: BehaviorUseCase) {}

  @Get('all')
  @AuthorizedOnly()
  async findManyBehaviors(
    @Query('search') search?: string,
  ): Promise<FindManyBehaviorsResponseDTO> {
    const behaviors = await this.behaviorUseCase.findMany(search);
    return {
      behaviors,
    };
  }

  @Get('/:behaviorId')
  @AuthorizedOnly()
  async getOneBehaviorByIdWithReservoir(
    @Param('behaviorId', ParseIntPipe) behaviorId: number,
  ): Promise<
    GetOneBehaviorByIdResponseDTO & {
      reservoir: GetOneReservoirByIdResponseDTO;
    }
  > {
    const behavior = await this.behaviorUseCase.getOneByIdWithReservoir(
      behaviorId,
    );
    return behavior;
  }

  @Post('create')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createBehavior(
    @ValidatedBody()
    createBehaviorDTO: CreateOneBehaviorRequestDTO,
  ): Promise<CreateOneBehaviorResponseDTO> {
    return await this.behaviorUseCase.createBehavior(createBehaviorDTO);
  }

  @Post('createMany')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createBehaviors(
    @ValidatedBody()
    { behaviors }: CreateManyBehaviorsRequestDTO,
  ): Promise<CreateManyBehaviorsResponseDTO> {
    return {
      createdBehaviors: await this.behaviorUseCase.createManyBehaviors(
        behaviors,
      ),
    };
  }

  @Post('deleteById')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async deleteBehavior(
    @ValidatedBody()
    { id }: DeleteEntityByIdDTO,
  ): Promise<EmptyResponseDTO> {
    await this.behaviorUseCase.deleteOne(id);
    return {};
  }
}
