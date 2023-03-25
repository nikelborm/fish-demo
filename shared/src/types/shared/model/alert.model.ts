// eslint-disable-next-line import/no-cycle
import type { IAlertType, IReservoir } from '.';

export class IAlert {
  id!: number;

  reservoir!: IReservoir;

  reservoir_id!: number;

  alert_type_id!: number;

  alertType!: IAlertType;

  importance!: number;

  createdAt!: Date;

  updatedAt!: Date;
}
