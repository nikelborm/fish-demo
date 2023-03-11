import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { NestedArrayDTO } from '../../../../../tools/shared';

export class CreateReservoirDTO {
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  name!: string;

  @IsNumber()
  fish_count!: number;

  @IsNumber()
  fish_part_id!: number;
}
export class CreateReservoirsDTO {
  @NestedArrayDTO(() => CreateReservoirDTO)
  reservoirs!: CreateReservoirDTO[];
}
