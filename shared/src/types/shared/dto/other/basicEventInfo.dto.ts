import { IsString, MaxLength, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';


export class BasicEventInfoDTO {
  @IsNumber()
  reservoirId!: number;

  @IsNumber()
  eventTypeId!: number;

  @IsString()
  @MaxLength(255)
  description!: string;

  @Type(() => Date)
  @IsDate()
  completionTime!: Date;
}
