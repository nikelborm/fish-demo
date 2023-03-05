import { PrimaryIdentityColumn } from 'src/tools';
import { ISensorInstance } from 'src/types';
import {
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { AbstractSensorToSensorInstance, SensorParameter } from '.';

@Entity({ name: 'sensor_instance' })
export class SensorInstance implements ISensorInstance {
  @PrimaryIdentityColumn('sensor_instance_id')
  id!: number;

  @OneToOne(
    () => AbstractSensorToSensorInstance,
    (abstractSensorToSensorInstance) =>
      abstractSensorToSensorInstance.sensorInstance,
  )
  abstractSensorToSensorInstance!: AbstractSensorToSensorInstance[];

  @ManyToMany(
    () => SensorParameter,
    (sensorParameter) => sensorParameter.sensorInstancesWithThatSensorParameter,
  )
  @JoinTable({
    name: 'sensor_parameter_instance',
    joinColumn: { name: 'sensor_instance_id' },
    inverseJoinColumn: { name: 'sensor_parameter_id' },
    // synchronize is important flag! Without it your migrations will have two conflicting declarations for question_to_category table
    // from https://github.com/typeorm/typeorm/blob/master/docs/decorator-reference.md#jointable
    synchronize: false,
  })
  sensorParameters!: SensorParameter[];

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
