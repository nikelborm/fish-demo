import { PrimaryIdentityColumn } from 'src/tools';
import { ISensorParameter, SensorParameterValueTypenameEnum } from 'src/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import {
  AbstractSensor,
  AbstractSensorToSensorParameter,
  SensorInstance,
  SensorParameterInstance,
} from '.';

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
    unique: true,
    nullable: false,
  })
  name!: string;

  @Column({
    name: 'value_type_name',
    type: 'enum',
    enum: SensorParameterValueTypenameEnum,
    nullable: false,
  })
  valueTypeName!: SensorParameterValueTypenameEnum;

  @ManyToMany(
    () => AbstractSensor,
    (abstractSensor) => abstractSensor.sensorParameters,
  )
  abstractSensorsWithThatSensorParameter!: AbstractSensor[];

  @ManyToMany(
    () => SensorInstance,
    (sensorInstance) => sensorInstance.sensorParameters,
  )
  sensorInstancesWithThatSensorParameter!: SensorInstance[];

  @OneToMany(
    () => AbstractSensorToSensorParameter,
    (abstractSensorToSensorParameter) =>
      abstractSensorToSensorParameter.sensorParameter,
  )
  abstractSensorToSensorParameterRelations!: AbstractSensorToSensorParameter[];

  @OneToMany(
    () => SensorParameterInstance,
    (sensorParameterInstance) => sensorParameterInstance.sensorParameter,
  )
  sensorParameterInstances!: SensorParameterInstance[];

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
