import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateOneFishBatchResponse {
  @IsPositive()
  @IsNumber()
  id!: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  name?: string;

  @IsOptional()
  @IsNumber()
  fish_kind_id?: number;

  @IsOptional()
  @IsNumber()
  age?: number;
}
