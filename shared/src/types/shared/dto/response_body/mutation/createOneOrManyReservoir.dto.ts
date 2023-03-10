import { NestedArrayDTO, NestedDTO } from '../../../../../tools/shared';
import { BasicReservoirInfoWithIdDTO } from '../../other/basicReservoirInfoWithId.dto';

export class CreateOneReservoirResponse {
  @NestedDTO(() => BasicReservoirInfoWithIdDTO)
  reservoir!: BasicReservoirInfoWithIdDTO;
}

export class CreateManyReservoirsResponseDTO {
  @NestedArrayDTO(() => BasicReservoirInfoWithIdDTO)
  createdUsers!: BasicReservoirInfoWithIdDTO[];
}
