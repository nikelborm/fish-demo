import { IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';


export class BasicReservoirInfoDTO {

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  name!: string;

  @IsNumber()
  fish_count!: number;

  @IsNumber()
  fish_part_id!: number;

}
