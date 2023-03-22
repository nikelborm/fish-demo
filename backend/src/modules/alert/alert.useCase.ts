import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { messages } from 'src/config';
import {
  CreateOneAlertRequestDTO,
  // UpdateAlertDTO,
  CreateOneAlertResponseDTO,
  // UpdateOneAlertResponse,
} from 'src/types';
import { repo } from '../infrastructure';

@Injectable()
export class AlertUseCase {
  constructor(private readonly alertRepo: repo.AlertRepo) {}

  async getOneById(id: number): Promise<repo.SelectedOnePlainAlert> {
    const alert = await this.alertRepo.findOneById(id);
    if (!alert)
      throw new NotFoundException(
        messages.repo.common.cantGetNotFoundById(id, 'alert'),
      );
    return alert;
  }

  async getOneByIdWithAlertType(id: number): Promise<
    repo.SelectedOnePlainAlert & {
      alertType: repo.SelectedOnePlainAlertType;
    }
  > {
    const alert = await this.alertRepo.findOneByIdWithAlertType(id);

    if (!alert)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(id, 'alert'),
      );

    return alert;
  }

  async createAlert(
    alert: CreateOneAlertRequestDTO,
  ): Promise<CreateOneAlertResponseDTO> {
    const insertedAlert = await this.alertRepo.createOnePlain(alert);
    return insertedAlert;
  }

  // async updateAlert({
  //   id,
  //   ...alert
  // }: UpdateAlertDTO): Promise<UpdateOneAlertResponse> {
  //   const updatedAlert = await this.alertRepo.updateOnePlain({ id }, alert);
  //   return updatedAlert;
  // }

  async deleteAlert(alertId: number): Promise<void> {
    return await this.alertRepo.deleteOneById(alertId);
  }
}
