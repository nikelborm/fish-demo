import { IAlert } from './alert.model';

export class IAlertType {
  id!: number;

  description!: string;

  alerts?: IAlert[];

  createdAt!: Date;

  updatedAt!: Date;
}
