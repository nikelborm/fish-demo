import { IsPositive, IsNumber, IsString } from 'class-validator';
import { IsDateConverted, NestedArrayDTO } from '../../../../../tools/shared';

export class GetOneEventByIdResponseDTO {
  @IsPositive()
  id!: number;

  @IsString()
  description!: string;

  @IsNumber()
  eventTypeId!: number;

  @IsNumber()
  reservoirId!: number;

  @IsDateConverted()
  completionTime!: Date;

  @IsDateConverted()
  createdAt!: Date;

  @IsDateConverted()
  updatedAt!: Date;
}

export class FindManyEventsResponseDTO {
  @NestedArrayDTO(() => GetOneEventByIdResponseDTO)
  events!: GetOneEventByIdResponseDTO[];
}
