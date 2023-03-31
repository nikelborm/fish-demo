import { Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiController, AuthorizedOnly, ValidatedBody } from 'src/tools';
import {
  GetOneAlertByIdResponseDTO,
  CreateOneAlertRequestDTO,
  // UpdateAlertDTO,
  CreateOneAlertResponseDTO,
  GetOneAlertTypeByIdResponseDTO,
  GetOneReservoirByIdResponseDTO,
  // UpdateOneAlertResponse,
} from 'src/types';
import { AlertUseCase } from './alert.useCase';

@ApiController('alert')
export class AlertController {
  constructor(private readonly alertUseCase: AlertUseCase) {}

  @Post('createAlert')
  //@AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createAlert(
    @ValidatedBody()
    createAlertDTO: CreateOneAlertRequestDTO,
  ): Promise<CreateOneAlertResponseDTO> {
    return await this.alertUseCase.createAlert(createAlertDTO);
  }

  @Get('/:alertFId')
  @AuthorizedOnly()
  async getOneAlertByIdWithTypeAndReservoir(
    @Param('alertId', ParseIntPipe) alertId: number,
  ): Promise<
    GetOneAlertByIdResponseDTO & {
      alertType: GetOneAlertTypeByIdResponseDTO;
      reservoir: GetOneReservoirByIdResponseDTO;
    }
  > {
    const alert = await this.alertUseCase.getOneByIdWithTypeAndReservoir(
      alertId,
    );
    return alert;
  }

  @Get('/:createdAt')
  async findEventsByData(
    @Param('createdAt')
    createdAt: Date,
  ): Promise<GetOneAlertByIdResponseDTO[] | null> {
    const event = await this.alertUseCase.getOneByData(createdAt);
    return event;
  }

  // @Post('updateAlert')
  // async updateAlert(
  //   @ValidatedBody()
  //   Alert: UpdateAlertDTO,
  // ): Promise<UpdateOneAlertResponse> {
  //   return await this.alertUseCase.updateAlert(Alert);
  // }

  @Delete(':AlertId')
  async deleteAlert(@Param('AlertId') AlertId: number): Promise<void> {
    return await this.alertUseCase.deleteAlert(AlertId);
  }
}
