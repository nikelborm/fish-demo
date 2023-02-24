import { Post } from '@nestjs/common';
import { ApiController, ValidatedBody } from 'src/tools';
import {
  CreateManySensorMeasurementsResponseDTO,
  CreateOneSensorMeasurementResponse,
  CreateSensorMeasurementDTO,
  CreateSensorMeasurementsDTO,
  FindManySensorMeasurementsResponseDTO,
  FindSensorMeasurementsDTO,
} from 'src/types';
import { SensorMeasurementUseCase } from './sensorMeasurement.useCase';

@ApiController('sensorMeasurement')
export class SensorMeasurementController {
  constructor(
    private readonly sensorMeasurementUseCase: SensorMeasurementUseCase,
  ) {}

  @Post('findMany')
  // @AuthorizedOnly()
  async findManySensorMeasurements(
    @ValidatedBody()
    searchOptions: FindSensorMeasurementsDTO,
  ): Promise<FindManySensorMeasurementsResponseDTO> {
    const sensorMeasurements = await this.sensorMeasurementUseCase.findManyWith(
      searchOptions,
    );
    return {
      sensorMeasurements,
    };
  }

  // @Get('latestForEachSensor')
  // // @AuthorizedOnly()
  // async getLatestMeasurementsForEachSensor(): Promise<FindManySensorMeasurementsResponseDTO> {
  //   const sensorMeasurements = await this.sensorMeasurementUseCase.findManyWith(
  //     searchOptions,
  //   );
  //   return {
  //     sensorMeasurements,
  //   };
  // }

  @Post('createOne')
  // @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createSensorMeasurement(
    @ValidatedBody()
    createSensorMeasurementDTO: CreateSensorMeasurementDTO,
  ): Promise<CreateOneSensorMeasurementResponse> {
    return await this.sensorMeasurementUseCase.createSensorMeasurement(
      createSensorMeasurementDTO,
    );
  }

  @Post('createMany')
  // @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createManySensorMeasurements(
    @ValidatedBody()
    { sensorMeasurements }: CreateSensorMeasurementsDTO,
  ): Promise<CreateManySensorMeasurementsResponseDTO> {
    return {
      sensorMeasurements:
        await this.sensorMeasurementUseCase.createManySensorMeasurements(
          sensorMeasurements,
        ),
    };
  }
}
