import { PrimaryIdentityColumn } from 'src/tools';
import type { IEvent } from 'src/types';
import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'event' })
export class Event implements IEvent {
  @PrimaryIdentityColumn('event_id')
  id!: number;

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
}
