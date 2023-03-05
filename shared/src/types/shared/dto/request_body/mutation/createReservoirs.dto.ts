import { IsString, MaxLength, MinLength } from 'class-validator';
import { NestedArrayDTO } from '../../../../../tools';

export class CreateReservoirDTO {
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  name!: string;
}

export class CreateReservoirsDTO {
  @NestedArrayDTO(() => CreateReservoirDTO)
  reservoirs!: CreateReservoirDTO[];
}
