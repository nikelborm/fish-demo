import { NestedDTO } from '../../../../../tools';
import { AuthTokenPairDTO } from '../../other/authTokenPair.dto';

export class RegisterUserResponseDTO {
  @NestedDTO(() => AuthTokenPairDTO)
  authTokenPair!: AuthTokenPairDTO;
}
