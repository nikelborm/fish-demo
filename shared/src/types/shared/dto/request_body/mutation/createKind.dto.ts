import { IsString, MinLength } from 'class-validator';

export class CreateFishKindDTO {
  @IsString()
  name!: string;

  @MinLength(1)
  @IsString()
  description!: string;

  @IsString()
  icon!: string;
}
