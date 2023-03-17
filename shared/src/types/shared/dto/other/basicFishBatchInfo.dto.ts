import { IsNumber, IsString } from 'class-validator';

export class BasicFishBatchInfoDTO {
  @IsString()
  name!: string;

  @IsNumber()
  fishKindId!: number;

  @IsNumber()
  age!: number;
}
