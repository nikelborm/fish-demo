import { IsNumber, IsString, MinLength, MaxLength } from 'class-validator';
import { NestedDTO } from '../../../../../tools/shared';
import { GetOneFishKindByIdResponseDTO } from './getOneFishKind.dto';

export class GetOneFishBatchByIdResponseDTO {
  @IsNumber()
  id!: number;

  @IsString()
  @MinLength(1)
  @MaxLength(128)
  name!: string;

  @NestedDTO(() => GetOneFishKindByIdResponseDTO)
  fishKind!: GetOneFishKindByIdResponseDTO;

  @IsNumber()
  age!: number;
}

export class GetOneFishBatchByIdForReservoirResponseDTO {
  @IsNumber()
  id!: number;

  @IsString()
  @MinLength(1)
  @MaxLength(128)
  name!: string;

  @IsNumber()
  fishKindId!: number;

  @IsNumber()
  age!: number;
}
