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
  fishCount?: number;

  @IsOptional()
  @IsNumber()
  fishBatchId?: number;
}
