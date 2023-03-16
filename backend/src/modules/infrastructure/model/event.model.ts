import { PrimaryIdentityColumn } from 'src/tools';
import type { IEvent } from 'src/types';
import { CreateDateColumn, Entity, UpdateDateColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EventType } from '.';

@Entity({ name: 'event' })
export class Event implements IEvent {
  @PrimaryIdentityColumn('event_id')
  id!: number;

 @Column({
    name: 'event_type_id',
    nullable: false,
  })
  eventTypeId!: number;

  @Column({
    name: 'completion_time',
    type: 'timestamptz',
    nullable: false,
  })
  completionTime!: Date;

  @Column({
    name: 'description',
    nullable: false,
  })
  description!: string;

  @Column({
    name: 'reservoir_id',
    nullable: false,
  })
  reservoirId!: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt!: Date;

  @ManyToOne(() => EventType, eventType => eventType.events, {onDelete: 'SET NULL', eager: true})
  @JoinColumn({
    name: 'event_type_id'
  })
  eventType!: EventType;
}
