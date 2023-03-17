import { Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AccessEnum, AllowedFor, ApiController, ValidatedBody } from 'src/tools';
import { GetOneAlertByIdResponceDTO } from 'src/types';
import { CreateAlertDTO } from 'src/types/shared/dto/request_body/mutation/createAlert.dto';
import { UpdateAlertDTO } from 'src/types/shared/dto/request_body/mutation/updateAlert.dto';
import { CreateOneAlertResponse } from 'src/types/shared/dto/response_body/mutation/createOneOrManyAlerts.dto';
import { UpdateOneAlertResponse } from 'src/types/shared/dto/response_body/mutation/updateOneAlert.dto';
import { AlertUseCase } from './alert.useCase';

@ApiController('alert')
export class AlertController {
  constructor(private readonly alertUseCase: AlertUseCase) {}

  @Post('createAlert')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createAlert(
    @ValidatedBody()
    createAlertDTO: CreateAlertDTO,
  ): Promise<CreateOneAlertResponse> {
    return await this.alertUseCase.createAlert(createAlertDTO);
  }

  @Get('/:alertId')
  async findOneAlertById(
    @Param('alertId', ParseIntPipe) alertId: number,
  ): Promise<GetOneAlertByIdResponceDTO> {
    const alert = await this.alertUseCase.getOneById(alertId);
    return alert;
  }

  @Post('updateAlert')
  async updateAlert(
    @ValidatedBody()
    Alert: UpdateAlertDTO,
  ): Promise<UpdateOneAlertResponse> {
    return await this.alertUseCase.updateAlert(Alert);
  }

  @Delete(':AlertId')
  async deleteAlert(
    @Param('AlertId') AlertId: number,
  ): Promise<void> {
    return await this.alertUseCase.deleteAlert(AlertId);
  }
}
