import { IsString, MaxLength } from 'class-validator';

export class CreateFishKindDTO {
  @IsString()
  name!: string;

  @IsString()
  @MaxLength(255)
  description!: string;

  @IsString()
  icon!: string;
}
