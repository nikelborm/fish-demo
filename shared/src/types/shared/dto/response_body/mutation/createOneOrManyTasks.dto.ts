import { IsPositive, IsString } from 'class-validator';
import { IsDateConverted, NestedArrayDTO } from '../../../../../tools/shared';

export class CreateOneTaskResponseDTO {
  @IsPositive()
  id!: number;

  @IsString()
  type!: string;

  @IsString()
  icon!: string;

  @IsString()
  description!: string;

  @IsDateConverted()
  createdAt!: Date;

  @IsDateConverted()
  updatedAt!: Date;
}

export class CreateManyTasksResponseDTO {
  @NestedArrayDTO(() => CreateOneTaskResponseDTO)
  createdTasks!: CreateOneTaskResponseDTO[];
}
