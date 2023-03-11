import { IsPositive } from 'class-validator';
import { BasicEventTypeInfoDTO } from './basicEventTypeInfo.dto';

export class BasicEventTypeInfoWithIdDTO extends BasicEventTypeInfoDTO {
  @IsPositive()
  id!: number;
}
