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
  @MinLength(8)
  @MaxLength(128)
  name?: string;

  @IsOptional()
  @IsNumber()
  fish_count?: number;

  @IsOptional()
  @IsNumber()
  fish_part_id?: number;
}
