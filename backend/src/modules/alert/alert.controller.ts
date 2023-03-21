import { Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiController, ValidatedBody } from 'src/tools';
import {
  GetOneAlertByIdResponseDTO,
  CreateOneAlertRequestDTO,
  // UpdateAlertDTO,
  CreateOneAlertResponseDTO,
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

  @Get('/:alertId')
  async findOneAlertById(
    @Param('alertId', ParseIntPipe) alertId: number,
  ): Promise<GetOneAlertByIdResponseDTO> {
    const alert = await this.alertUseCase.getOneById(alertId);
    return alert;
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
