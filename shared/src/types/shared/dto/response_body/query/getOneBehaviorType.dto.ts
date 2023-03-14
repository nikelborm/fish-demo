import { IsNumber, IsString } from 'class-validator';

export class GetOneBehaviorTypeByIdResponseDTO {
  @IsNumber()
  id!: number;

  @IsString()
  name!: string;

  @IsString()
  description!: string;
}
