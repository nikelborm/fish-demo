import { PrimaryIdentityColumn } from 'src/tools';
import { ISensorParameter } from 'src/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { AbstractSensor, AbstractSensorToSensorParameter } from '.';

@Entity({ name: 'sensor_parameter' })
export class SensorParameter implements ISensorParameter {
  @PrimaryIdentityColumn('sensor_parameter_id')
  id!: number;

  @Column({
    name: 'unit',
    nullable: false,
  })
  unit!: string;

  @Column({
    name: 'name',
    nullable: false,
  })
  name!: string;

  @ManyToMany(
    () => AbstractSensor,
    (abstractSensor) => abstractSensor.sensorParameters,
  )
  abstractSensorsWithThatSensorParameter!: AbstractSensor[];

  @OneToMany(
    () => AbstractSensorToSensorParameter,
    (abstractSensorToSensorParameter) =>
      abstractSensorToSensorParameter.sensorParameter,
  )
  abstractSensorToSensorParameterRelations!: AbstractSensorToSensorParameter[];

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
