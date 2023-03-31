import { IsString, MaxLength, IsNumber } from 'class-validator';

export class BasicFishInfoInfoDTO {
  @IsString()
  name!: string;

  @IsNumber()
  behavior_id!: number;

  @IsString()
  @MaxLength(255)
  description!: string;
}
