import { PrimaryIdentityColumn } from 'src/tools';
import type { IAlertType } from 'src/types';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

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
}
