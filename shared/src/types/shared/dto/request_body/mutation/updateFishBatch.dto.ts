import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateFishBatchDTO {
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

  @Type(() => Date)
  @IsDate()
  created_at!: Date;

  @Type(() => Date)
  @IsDate()
  updated_at!: Date;
}
