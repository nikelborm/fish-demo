import { NestedArrayDTO, NestedDTO } from '../../../../../tools/shared';
import { BasicFishKindInfoWithIdDTO } from '../../other/basicFishKindInfoWithId.dto';

export class CreateOneFishKindResponse {
  @NestedDTO(() => BasicFishKindInfoWithIdDTO)
  fishKind!: BasicFishKindInfoWithIdDTO;
}

export class CreateManyFishKindsResponseDTO {
  @NestedArrayDTO(() => BasicFishKindInfoWithIdDTO)
  createdFishKinds!: BasicFishKindInfoWithIdDTO[];
}
