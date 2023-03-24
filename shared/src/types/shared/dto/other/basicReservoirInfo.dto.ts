import { IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';


export class BasicReservoirInfoDTO {

  @IsString()
  @MinLength(3)
  @MaxLength(128)
  name!: string;

  @IsNumber()
  fish_count!: number;

  @IsNumber()
  fish_batch_id!: number;

}
