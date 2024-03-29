import { PrimaryIdentityColumn } from 'src/tools';
import type { IAlert } from 'src/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { AlertType } from './alertType.model';
import { Reservoir } from './reservoir.model';

@Entity({ name: 'alert' })
export class Alert implements IAlert {
  @PrimaryIdentityColumn('alert_id')
  id!: number;

  @Column({
    name: 'reservoir_id',
    nullable: false,
  })
  reservoir_id!: number;

  @Column({
    name: 'alert_type_id',
    nullable: false,
  })
  alert_type_id!: number;

  @Column({
    name: 'importance',
    nullable: false,
    type: 'real',
  })
  importance!: number;

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

  @ManyToOne(() => AlertType, (alertType) => alertType.alerts)
  @JoinColumn({
    name: 'alert_type_id',
  })
  alertType!: AlertType;

  @ManyToOne(() => Reservoir, (reservoir) => reservoir.alerts)
  @JoinColumn({
    name: 'reservoir_id',
  })
  reservoir!: Reservoir;
}
