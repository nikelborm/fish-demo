import { Type } from 'class-transformer';
import { IsDate, IsString, MaxLength, IsNumber } from 'class-validator';

export class CreateOneEventRequestDTO {
  @IsNumber()
  eventType_id!: number;

  @Type(() => Date)
  @IsDate()
  completion_time!: Date;

  @IsString()
  @MaxLength(255)
  description!: string;

  @IsNumber()
  reservoir_id!: number;
}
