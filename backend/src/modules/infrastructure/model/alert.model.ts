import { PrimaryIdentityColumn } from 'src/tools';
import type { IAlert } from 'src/types';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'alert' })
export class Alert implements IAlert {
  @PrimaryIdentityColumn('alert_id')
  id!: number;

  @Column({
    name:'reservoir_id',
    nullable: false,
  })
  reservoir_id!: number

  @Column({
    name:'alert_type_id',
    nullable: false,
  })
  alert_type_id!: number

  @CreateDateColumn({
    name:'time',
    nullable: false,
    type: 'timestamptz'
  })
  time!: Date

  @Column({
    name:'importance',
    nullable: false,
    type: 'real'
  })
  importance!: number

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
