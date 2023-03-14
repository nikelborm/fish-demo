import { IsPositive } from 'class-validator';
import { BasicBehaviorTypeInfoDTO } from './basicBehaviorTypeInfo.dto';

export class BasicBehaviorTypeInfoWithIdDTO extends BasicBehaviorTypeInfoDTO {
  @IsPositive()
  id!: number;
}
