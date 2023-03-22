import type { IEventType, IReservoir } from '.';

export class IEvent {
  id!: number;

  description!: string;

  eventTypeId!: number;

  eventType!: IEventType;

  reservoirId!: number;

  reservoir!: IReservoir;

  completionTime!: Date;

  createdAt!: Date;

  updatedAt!: Date;
}
