import { IsString, MaxLength, MinLength } from 'class-validator';
import { NestedDTO } from '../../../../../tools/shared';

export class CreateBehaviorTypeDTO {
  @IsString()
  @MinLength(1)
  name!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(255)
  description!: string;
}

export class CreateBehaviorTypesDTO {
  @NestedDTO(() => CreateBehaviorTypeDTO)
  eventTypes!: CreateBehaviorTypeDTO[];
}
