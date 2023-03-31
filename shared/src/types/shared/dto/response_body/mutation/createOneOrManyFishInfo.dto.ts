import { NestedArrayDTO, NestedDTO } from '../../../../../tools/shared';
import { BasicFishInfoInfoWithIdDTO } from '../../other/basicFishInfoWithId.dto';

export class CreateOneFishInfoResponse {
  @NestedDTO(() => BasicFishInfoInfoWithIdDTO)
  fishInfo!: BasicFishInfoInfoWithIdDTO;
}

export class CreateManyFishInfoResponseDTO {
  @NestedArrayDTO(() => BasicFishInfoInfoWithIdDTO)
  createdFishInfos!: BasicFishInfoInfoWithIdDTO[];
}
