import { IsPositive } from 'class-validator';
import { BasicFishBatchInfoDTO } from './basicFishBatchInfo.dto';

export class BasicFishBatchInfoWithIdDTO extends BasicFishBatchInfoDTO {
  @IsPositive()
  id!: number;
}
