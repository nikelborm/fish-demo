import { IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateFishInfoDTO {
  @IsString()
  name!: string;

  @IsNumber()
  behavior_id!: number;

  @IsString()
  @MaxLength(255)
  description!: string;
}
