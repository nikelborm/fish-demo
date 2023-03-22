import { Injectable, NotFoundException } from '@nestjs/common';
import { messages } from 'src/config';
import { CreateAlertTypeDTO } from 'src/types';
import { UpdateAlertTypeDTO } from 'src/types/shared/dto/request_body/mutation/updateAlertType.dto';
import { CreateOneAlertTypeResponse } from 'src/types/shared/dto/response_body/mutation/createOneOrManyAlertType.dto';
import { UpdateOneAlertTypeResponse } from 'src/types/shared/dto/response_body/mutation/updateOneAlertType.dto';
import { model, repo } from '../infrastructure';

@Injectable()
export class AlertTypeUseCase {
  constructor(private readonly alertTypeRepo: repo.AlertTypeRepo) {}

  async getOneById(id: number): Promise<repo.SelectedOnePlainAlertType> {
    const alertType = await this.alertTypeRepo.findOneById(id);
    if (!alertType)
      throw new NotFoundException(messages.repo.user.cantGetNotFoundById(id));
    return alertType;
  }

  async createManyAlertTypes(
    alertTypes: CreateAlertTypeDTO[],
  ): Promise<
    Required<
      CreateAlertTypeDTO &
        Pick<model.AlertType, 'id' | 'createdAt' | 'updatedAt'>
    >[]
  > {
    const insertedAlertTypees = await this.alertTypeRepo.createManyPlain(
      alertTypes,
    );
    return insertedAlertTypees;
  }

  async createAlertType(
    alertType: CreateAlertTypeDTO,
  ): Promise<CreateOneAlertTypeResponse> {
    const insertedAlertType = await this.alertTypeRepo.createOnePlain(
      alertType,
    );
    return { alertType: insertedAlertType };
  }

  async updateAlertType({
    id,
    ...rest
  }: UpdateAlertTypeDTO): Promise<UpdateOneAlertTypeResponse> {
    const updatedAlertType = await this.alertTypeRepo.updateOnePlain(
      { id },
      rest,
    );
    return updatedAlertType;
  }
  async deleteAlertType(alertTypeId: number): Promise<void> {
    return await this.alertTypeRepo.deleteOneById(alertTypeId);
  }
}
