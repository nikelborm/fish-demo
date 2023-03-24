import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class UpdateAlertDTO {
  @IsPositive()
  @IsNumber()
  id!: number;

  @IsOptional()
  @IsNumber()
  reservoir_id?: number;

  @IsOptional()
  @IsNumber()
  alert_type_id?: number;

  @IsOptional()
  @IsNumber()
  importance?: number;

  @Type(() => Date)
  @IsDate()
  created_at!: Date;

  @Type(() => Date)
  @IsDate()
  updated_at!: Date;
}
