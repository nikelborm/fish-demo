import { Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import {
  //AccessEnum,
  //AllowedFor,
  ApiController,
  ValidatedBody,
} from 'src/tools';
import { CreateAlertTypeDTO } from 'src/types/shared/dto/request_body/mutation/createAlertType.dto';
import { UpdateAlertTypeDTO } from 'src/types/shared/dto/request_body/mutation/updateAlertType.dto';
import { CreateOneAlertTypeResponse } from 'src/types/shared/dto/response_body/mutation/createOneOrManyAlertType.dto';
import { UpdateOneAlertTypeResponse } from 'src/types/shared/dto/response_body/mutation/updateOneAlertType.dto';
import { GetOneAlertTypeByIdResponseDTO } from 'src/types/shared/dto/response_body/query/getOneAlertType.dto';
import { AlertTypeUseCase } from './alertType.useCase';

@ApiController('alertType')
export class AlertTypeController {
  constructor(private readonly alertTypeUseCase: AlertTypeUseCase) {}

  @Post('createAlertType')
  //@AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createAlertType(
    @ValidatedBody()
    createAlertTypeDTO: CreateAlertTypeDTO,
  ): Promise<CreateOneAlertTypeResponse> {
    return await this.alertTypeUseCase.createAlertType(createAlertTypeDTO);
  }

  @Get('/:alertTypeId')
  async findOneAlertTypeById(
    @Param('alertTypeId', ParseIntPipe) alertTypeId: number,
  ): Promise<GetOneAlertTypeByIdResponseDTO> {
    const alertType = await this.alertTypeUseCase.getOneById(alertTypeId);
    return alertType;
  }

  @Post('updateAlertType')
  async updateAlertType(
    @ValidatedBody()
    AlertType: UpdateAlertTypeDTO,
  ): Promise<UpdateOneAlertTypeResponse> {
    return await this.alertTypeUseCase.updateAlertType(AlertType);
  }

  @Delete(':AlertTypeId')
  async deleteAlertType(
    @Param('AlertTypeId') AlertTypeId: number,
  ): Promise<void> {
    return await this.alertTypeUseCase.deleteAlertType(AlertTypeId);
  }
}
