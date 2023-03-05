import { Post, Request } from '@nestjs/common';
import { AllowedFor, ApiController, ValidatedBody } from 'src/tools';
import {
  AuthedRequest,
  CreateManyReservoirsResponseDTO,
  CreateOneReservoirResponse,
  CreateReservoirDTO,
  CreateReservoirsDTO,
  FindManyReservoirsResponseDTO,
  FindReservoirsDTO,
} from 'src/types';
import { ReservoirUseCase } from './reservoir.useCase';

@ApiController('reservoir')
export class ReservoirController {
  constructor(private readonly reservoirUseCase: ReservoirUseCase) {}

  @Post('findMany')
  // @AuthorizedOnly()
  async findManyReservoirs(
    @ValidatedBody()
    searchOptions: FindReservoirsDTO,
  ): Promise<FindManyReservoirsResponseDTO> {
    const reservoirs = await this.reservoirUseCase.findManyWith(searchOptions);
    return {
      reservoirs,
    };
  }

  // @Get('latestForEachSensor')
  // // @AuthorizedOnly()
  // async getLatestMeasurementsForEachSensor(): Promise<FindManyReservoirsResponseDTO> {
  //   const reservoirs = await this.reservoirUseCase.findManyWith(
  //     searchOptions,
  //   );
  //   return {
  //     reservoirs,
  //   };
  // }

  @Post('createOne')
  // @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createReservoir(
    @ValidatedBody()
    createReservoirDTO: CreateReservoirDTO,
    // @Request() { user }: AuthedRequest,
  ): Promise<CreateOneReservoirResponse> {
    return await this.reservoirUseCase.createReservoir(createReservoirDTO);
  }

  @Post('createMany')
  // @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createManyReservoirs(
    @ValidatedBody()
    { reservoirs }: CreateReservoirsDTO,
  ): Promise<CreateManyReservoirsResponseDTO> {
    return {
      reservoirs: await this.reservoirUseCase.createManyReservoirs(reservoirs),
    };
  }
}
