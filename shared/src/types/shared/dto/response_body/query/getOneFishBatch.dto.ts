import { IsNumber, IsString, MinLength, MaxLength } from 'class-validator';

export class GetOneFishBatchByIdResponseDTO {
  @IsNumber()
  id!: number;

  @IsString()
  @MinLength(1)
  @MaxLength(128)
  name!: string;

  @IsNumber()
  fish_kind_id!: number;

  @IsNumber()
  age!: number;
}
