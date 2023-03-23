import { PrimaryIdentityColumn } from 'src/tools';
import type { IAlertType } from 'src/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { Alert } from './alert.model';

@Entity({ name: 'alert_type' })
export class AlertType implements IAlertType {
  @PrimaryIdentityColumn('alert_type_id')
  id!: number;

  @Column({
    name: 'description',
    type: 'varchar',
  })
  description!: string;

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

  @OneToMany(() => Alert, (alert) => alert.alertType)
  alerts?: Alert[];
}
