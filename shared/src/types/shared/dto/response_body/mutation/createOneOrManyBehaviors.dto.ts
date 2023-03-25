import { IsPositive } from 'class-validator';
import { IsDateConverted, NestedArrayDTO } from '../../../../../tools/shared';

export class CreateOneBehaviorResponseDTO {
  @IsPositive()
  id!: number;

  @IsPositive()
  probability!: number;

  @IsDateConverted()
  time!: Date;

  @IsPositive()
  behaviorTypeId!: number;

  @IsPositive()
  reservoirId!: number;

  @IsDateConverted()
  createdAt!: Date;

  @IsDateConverted()
  updatedAt!: Date;
}

export class CreateManyBehaviorsResponseDTO {
  @NestedArrayDTO(() => CreateOneBehaviorResponseDTO)
  createdBehaviors!: CreateOneBehaviorResponseDTO[];
}
