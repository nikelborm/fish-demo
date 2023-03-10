import { IsPositive } from 'class-validator';
import { BasicReservoirInfoDTO } from './basicReservoirInfo.dto';

export class BasicReservoirInfoWithIdDTO extends BasicReservoirInfoDTO {
  @IsPositive()
  id!: number;
}
