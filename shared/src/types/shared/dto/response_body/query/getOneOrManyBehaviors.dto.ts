import { IsPositive } from 'class-validator';
import {
  IsDateConverted,
  NestedArrayDTO,
  NestedDTO,
} from '../../../../../tools/shared';
import { GetOneReservoirByIdResponseDTO } from './findOneReservoirByIdResponse.dto';

export class GetOneBehaviorByIdResponseDTO {
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

  @NestedDTO(() => GetOneReservoirByIdResponseDTO)
  reservoir!: GetOneReservoirByIdResponseDTO;
}

export class OneOfFoundBehaviorsResponseDTO {
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

export class FindManyBehaviorsResponseDTO {
  @NestedArrayDTO(() => OneOfFoundBehaviorsResponseDTO)
  behaviors!: OneOfFoundBehaviorsResponseDTO[];
}
