 import type {
  IEventType,
} from '.';


export class IEvent {
  id!: number;

  description!: string;

  eventTypeId!: number;

  eventType!: IEventType;

  reservoirId!: number;

  completionTime!: Date;

  createdAt!: Date;

  updatedAt!: Date;
}
