import type {
  IEventType,
} from '.';

export class IEvent {
  event_id!: number;

  description?: string;

  eventType_id!: number;

  eventType!: IEventType;

  reservoir_id!: number;

  completion_time!: Date;

  createdAt!: Date;

  updatedAt!: Date;
}
