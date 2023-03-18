import type {
  IEvent,
} from '.';

export class IEventType {
  id!: number;

  name!: string;

  description!: string;

  events?: IEvent[];

  createdAt!: Date;

  updatedAt!: Date;
}
