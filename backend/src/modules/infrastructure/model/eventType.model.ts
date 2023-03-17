import { PrimaryIdentityColumn } from 'src/tools';
import type { IEventType } from 'src/types';
import { Column, CreateDateColumn, Entity, /*OneToMany,*/ UpdateDateColumn } from 'typeorm';
//import { Event } from '.' ;

@Entity({ name: 'event_type' })
export class EventType implements IEventType {
  @PrimaryIdentityColumn('event_type_id')
  id!: number;

  @Column({
    name: 'name',
    nullable: false,
    unique: true,
  })
  name!: string;

  @Column({
    name: 'description',
    nullable: false,
  })
  description!: string;

  @Column({
    name: 'icon',
    nullable: true,
  })
  icon?: string;

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

 /* @OneToMany(() => Event, (event) => event.eventType)
  events!: Event[]; */

}
