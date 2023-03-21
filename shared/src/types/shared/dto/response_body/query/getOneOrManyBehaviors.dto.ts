import { IsPositive } from 'class-validator';
import { IsDateConverted, NestedArrayDTO } from '../../../../../tools/shared';

export class GetOneBehaviorByIdResponseDTO {
  @IsPositive()
  id!: number;

  @IsPositive()
  probability!: number;

  @IsDateConverted()
  time!: Date;

  @IsPositive()
  behaviorTypeId!: number;

  @IsDateConverted()
  createdAt!: Date;

  @IsDateConverted()
  updatedAt!: Date;
}

export class FindManyBehaviorsResponseDTO {
  @NestedArrayDTO(() => GetOneBehaviorByIdResponseDTO)
  behaviors!: GetOneBehaviorByIdResponseDTO[];
}
