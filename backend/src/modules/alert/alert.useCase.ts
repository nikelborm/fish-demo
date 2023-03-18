import { Injectable, NotFoundException } from '@nestjs/common';
import { messages } from 'src/config';
import { CreateAlertDTO } from 'src/types/shared/dto/request_body/mutation/createAlert.dto';
import { UpdateAlertDTO } from 'src/types/shared/dto/request_body/mutation/updateAlert.dto';
import { CreateOneAlertResponse } from 'src/types/shared/dto/response_body/mutation/createOneOrManyAlerts.dto';
import { UpdateOneAlertResponse } from 'src/types/shared/dto/response_body/mutation/updateOneAlert.dto';
import { repo } from '../infrastructure';

@Injectable()
export class AlertUseCase {
  constructor(private readonly alertRepo: repo.AlertRepo) {}

  async getOneById(id: number): Promise <repo.SelectedOnePlainAlert>{
    const alert = await this.alertRepo.findOneById(id);
    if (!alert) throw new NotFoundException(messages.repo.common.cantGetNotFoundById(id, 'alert'));
    return alert;
  }

  async createAlert(
    alert: CreateAlertDTO,
  ): Promise<CreateOneAlertResponse> {
    const insertedAlert = await this.alertRepo.createOnePlain(
      alert,
    );
    return { alert: insertedAlert };
  }

  async updateAlert({
    id,
    ...alert
  }: UpdateAlertDTO): Promise<UpdateOneAlertResponse> {
    const updatedAlert = await this.alertRepo.updateOnePlain(
      { id },
      alert,
    );
    return updatedAlert;
  }

  async deleteAlert(alertId: number): Promise<void> {
    return await this.alertRepo.deleteOneById(alertId);
  }
}
