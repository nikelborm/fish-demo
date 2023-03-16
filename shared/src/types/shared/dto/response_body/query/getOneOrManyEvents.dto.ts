import { IsPositive, IsNumber, IsString } from 'class-validator';
import { IsDateConverted, NestedArrayDTO } from '../../../../../tools/shared';

export class GetOneEventByIdResponseDTO {
  @IsPositive()
  event_id!: number;

  @IsString()
  description!: string;

  @IsNumber()
  eventType_id!: number;

  @IsNumber()
  reservoir_id!: number;

  @IsDateConverted()
  completion_time!: Date;

  @IsDateConverted()
  createdAt!: Date;

  @IsDateConverted()
  updatedAt!: Date;
}

export class FindManyEventsResponseDTO {
  @NestedArrayDTO(() => GetOneEventByIdResponseDTO)
  events!: GetOneEventByIdResponseDTO[];
}
