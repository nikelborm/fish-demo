import { IsString, MaxLength, MinLength } from 'class-validator';
import { NestedDTO } from '../../../../../tools/shared';

export class CreateEventTypeDTO {
  @IsString()
  @MinLength(1)
  name!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(255)
  description!: string;

  @IsString()
  icon!: string;
}

export class CreateEventTypesDTO {
  @NestedDTO(() => CreateEventTypeDTO)
  eventTypes!: CreateEventTypeDTO[];
}
