import { IsPositive, IsNumber, IsString } from 'class-validator';
import {
  IsDateConverted,
  NestedArrayDTO,
  NestedDTO,
} from '../../../../../tools/shared';
import { GetOneEventTypeByIdResponseDTO } from './getOneEventType.dto';
import { GetOneReservoirByIdResponseDTO } from './findOneReservoirByIdResponse.dto';

export class GetOneEventByIdResponseDTO {
  @IsPositive()
  id!: number;

  @IsString()
  description!: string;

  @IsNumber()
  eventTypeId!: number;

  @NestedDTO(() => GetOneEventTypeByIdResponseDTO)
  eventType!: GetOneEventTypeByIdResponseDTO;

  @IsNumber()
  reservoirId!: number;

  @NestedDTO(() => GetOneReservoirByIdResponseDTO)
  reservoir!: GetOneReservoirByIdResponseDTO;

  @IsDateConverted()
  completionTime!: Date;

  @IsDateConverted()
  createdAt!: Date;

  @IsDateConverted()
  updatedAt!: Date;
}

export class GetOneEventForManyResponseDTO {
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
  @NestedArrayDTO(() => GetOneEventForManyResponseDTO)
  events!: GetOneEventForManyResponseDTO[];
}
