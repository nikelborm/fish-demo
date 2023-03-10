import { IsPositive } from 'class-validator';
import { BasicFishKindInfoDTO } from './basicFishKindInfo.dto';

export class BasicFishKindInfoWithIdDTO extends  BasicFishKindInfoDTO {
  @IsPositive()
  id!: number;
}
