import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateOneReservoirResponse {
  @IsPositive()
  id!: number;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(128)
  name?: string;

  @IsOptional()
  @IsNumber()
  fish_count?: number;

  @IsOptional()
  @IsNumber()
  fish_batch_id?: number;
}
