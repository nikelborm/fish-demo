import { IsPositive } from 'class-validator';
import { BasicAlertTypeInfoDTO } from './basicAlertTypeInfo.dto';

export class BasicAlertTypeInfoWithIdDTO extends BasicAlertTypeInfoDTO {
  @IsPositive()
  id!: number;
}
