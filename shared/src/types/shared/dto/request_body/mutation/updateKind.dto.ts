import { Type } from 'class-transformer';
import {
  IsDate,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateFishKindDTO {
  @IsPositive()
  id!: number;

  @IsString()
  name!: string;

  @IsString()
  @MaxLength(255)
  description!: string;

  @IsString()
  icon?: string;

  @Type(() => Date)
  @IsDate()
  created_at!: Date;

  @Type(() => Date)
  @IsDate()
  updated_at!: Date;
}
