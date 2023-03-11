import { IsPositive } from 'class-validator';
import { BasicFishBatchInfoDTO } from './basisFishBatchInfo.dto';

export class BasicFishBatchInfoWithIdDTO extends BasicFishBatchInfoDTO {
  @IsPositive()
  id!: number;
}
