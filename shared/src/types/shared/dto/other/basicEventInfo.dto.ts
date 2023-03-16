import { IsString, MaxLength, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class BasicEventInfoDTO {
  @IsNumber()
  reservoir_id!: number;

  @IsNumber()
  eventType_id!: number;

  @IsString()
  @MaxLength(255)
  description!: string;

  @Type(() => Date)
  @IsDate()
  completion_time!: Date;
}
