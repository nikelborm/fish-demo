import { Type } from 'class-transformer';
import { IsDate, IsDefined, IsNumberString } from 'class-validator';
import { NestedArrayDTO } from '../../../../../tools/shared';

export class CreateOneSensorMeasurementResponse {
  @IsNumberString()
  id!: string;
  // id!: string because postgres bigint is larger than javascript can handle
  // https://github.com/typeorm/typeorm/issues/8583#issuecomment-1024907598

  @IsDate()
  @Type(() => Date)
  recordedAt!: Date;

  @IsDefined()
  value!: any;
}

export class CreateManySensorMeasurementsResponseDTO {
  @NestedArrayDTO(() => CreateOneSensorMeasurementResponse)
  sensorMeasurements!: CreateOneSensorMeasurementResponse[];
}
