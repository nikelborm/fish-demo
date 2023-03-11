import { IsNumber, IsString } from 'class-validator';

export class BasicFishBatchInfoDTO {
  @IsString()
  name!: string;

  @IsNumber()
  fish_kind_id!: number;

  @IsNumber()
  age!: number;
}
