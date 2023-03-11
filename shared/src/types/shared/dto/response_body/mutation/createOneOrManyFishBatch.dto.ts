import { NestedArrayDTO, NestedDTO } from '../../../../../tools/shared';
import { BasicFishBatchInfoWithIdDTO } from '../../other/basicFishBatchInfoWithId.dto';

export class CreateOneFishBatchResponse {
  @NestedDTO(() => BasicFishBatchInfoWithIdDTO)
  fishBatch!: BasicFishBatchInfoWithIdDTO;
}

export class CreateManyFishBatchesResponseDTO {
  @NestedArrayDTO(() => BasicFishBatchInfoWithIdDTO)
  createdFishBatches!: BasicFishBatchInfoWithIdDTO[];
}
