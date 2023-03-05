import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { NestedDTO } from '../../../../tools';
import { AuthTokenPairDTO } from '../../other/authTokenPair.dto';

export class RegisterUserResponseDTO {
  @NestedDTO(() => AuthTokenPairDTO)
  authTokenPair!: AuthTokenPairDTO;
}
