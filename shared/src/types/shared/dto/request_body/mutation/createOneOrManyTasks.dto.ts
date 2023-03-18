import { IsString } from 'class-validator';
import { NestedArrayDTO } from '../../../../../tools/shared';

export class CreateOneTaskRequestDTO {
  @IsString()
  type!: string;

  @IsString()
  icon!: string;

  @IsString()
  description!: string;
}

export class CreateManyTasksRequestDTO {
  @NestedArrayDTO(() => CreateOneTaskRequestDTO)
  tasks!: CreateOneTaskRequestDTO[];
}
