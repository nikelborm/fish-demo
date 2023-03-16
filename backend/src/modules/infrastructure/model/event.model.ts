import { PrimaryIdentityColumn } from 'src/tools';
import type { IEvent } from 'src/types';
import { CreateDateColumn, Entity, UpdateDateColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EventType } from '.';

@Entity({ name: 'event' })
export class Event implements IEvent {
  @PrimaryIdentityColumn('event_id')
  event_id!: number;

 @Column({
    name: 'eventType_id',
    nullable: false,
  })
  eventType_id!: number;

  @Column({
    name: 'completion_time',
  //  type: 'timestamptz',
    nullable: false,
  })
  completion_time!: Date;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: true,
  })
  description?: string;

  @Column({
    name: 'reservoir_id',
    nullable: true,
  })
  reservoir_id!: number;

  @CreateDateColumn({
    name: 'createdAt',
    type: 'timestamptz',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updatedAt',
    type: 'timestamptz',
  })
  updatedAt!: Date;

  @ManyToOne(() => EventType, eventType => eventType.events, {onDelete: 'SET NULL', eager: true})
  @JoinColumn({
    name: 'eventType_id'
  })
  eventType!: EventType;
}
