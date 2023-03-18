import { IsPositive } from 'class-validator';
import { IsDateConverted, NestedArrayDTO } from '../../../../../tools/shared';

export class CreateOneBehaviorRequestDTO {
  @IsPositive()
  probability!: number;

  @IsDateConverted()
  time!: Date;

  @IsPositive()
  behaviorTypeId!: number;
}

export class CreateManyBehaviorsRequestDTO {
  @NestedArrayDTO(() => CreateOneBehaviorRequestDTO)
  behaviors!: CreateOneBehaviorRequestDTO[];
}
