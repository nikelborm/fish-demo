import { IsPositive, IsString } from 'class-validator';
import { IsDateConverted, NestedArrayDTO } from '../../../../../tools/shared';

export class GetOneTaskTimeByIdResponseDTO {
  @IsPositive()
  id!: number;

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

  @IsDateConverted()
  createdAt!: Date;

  @IsDateConverted()
  updatedAt!: Date;
}

export class FindManyTaskTimesResponseDTO {
  @NestedArrayDTO(() => GetOneTaskTimeByIdResponseDTO)
  taskTimes!: GetOneTaskTimeByIdResponseDTO[];
}
