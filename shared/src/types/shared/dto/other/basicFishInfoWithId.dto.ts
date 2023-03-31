import { IsPositive } from 'class-validator';
import { BasicFishInfoInfoDTO } from './basicFishInfo.dto';

export class BasicFishInfoInfoWithIdDTO extends BasicFishInfoInfoDTO {
  @IsPositive()
  id!: number;
}
