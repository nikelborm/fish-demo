import { Type } from 'class-transformer';
import { IsDate, IsString, MaxLength, IsNumber } from 'class-validator';

export class CreateOneEventRequestDTO {
  @IsNumber()
  eventTypeId!: number;

  @Type(() => Date)
  @IsDate()
  completionTime!: Date;

  @IsString()
  @MaxLength(255)
  description!: string;

  @IsNumber()
  reservoirId!: number;
}
