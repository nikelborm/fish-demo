import { IsPositive, IsString } from 'class-validator';
import { NestedArrayDTO } from '../../../../../tools/shared';

export class CreateOneTaskTimeRequestDTO {
  @IsString()
  daytime!: string;

  @IsString()
  deadlineTime!: string;

  @IsPositive()
  dayOfWeek!: number;

  @IsString()
  repeatType!: string;

  @IsPositive()
  taskId!: number;
}

export class CreateManyTaskTimesRequestDTO {
  @NestedArrayDTO(() => CreateOneTaskTimeRequestDTO)
  taskTimes!: CreateOneTaskTimeRequestDTO[];
}
