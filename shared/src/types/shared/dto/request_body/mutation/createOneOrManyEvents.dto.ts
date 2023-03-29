import { Type } from 'class-transformer';
import {
  IsDate,
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
} from 'class-validator';

export class CreateOneEventRequestDTO {
  @IsString()
  eventTypeName!: string;

  @Type(() => Date)
  @IsDate()
  completionTime!: Date;

  @IsString()
  @MinLength(1)
  @MaxLength(255)
  description!: string;

  @IsNumber()
  reservoirId!: number;
}
