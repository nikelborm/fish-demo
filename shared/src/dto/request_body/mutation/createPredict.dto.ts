import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePredictDTO {
  @Type(() => Date)
  @IsDate()
  date!: Date;

  @IsString()
  @MaxLength(5)
  @MinLength(1)
  predictCodeName!: string;

  @IsNumber()
  value!: number;
}
