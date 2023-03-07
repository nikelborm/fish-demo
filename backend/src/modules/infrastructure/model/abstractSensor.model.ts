import { PrimaryIdentityColumn } from 'src/tools';
import { IAbstractSensor } from 'src/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import {
  AbstractSensorToSensorInstance,
  AbstractSensorToSensorParameter,
  SensorParameter,
  SensorParameterInstance,
} from '.';

@Entity({ name: 'abstract_sensor' })
export class AbstractSensor implements IAbstractSensor {
  @PrimaryIdentityColumn('abstract_sensor_id')
  id!: number;

  @Column({
    name: 'model_name',
    nullable: false,
    unique: true,
  })
  modelName!: string;

  @ManyToMany(
    () => SensorParameter,
    (sensorParameter) => sensorParameter.abstractSensorsWithThatSensorParameter,
  )
  @JoinTable({
    name: 'abstract_sensor_to_sensor_parameter',
    joinColumn: { name: 'abstract_sensor_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'sensor_parameter_id',
      referencedColumnName: 'id',
    },
    // synchronize is important flag! Without it your migrations will have two conflicting declarations for question_to_category table
    // from https://github.com/typeorm/typeorm/blob/master/docs/decorator-reference.md#jointable
    synchronize: false,
  })
  sensorParameters!: SensorParameter[];

  @OneToMany(
    () => AbstractSensorToSensorParameter,
    (abstractSensorToSensorParameter) =>
      abstractSensorToSensorParameter.abstractSensor,
  )
  abstractSensorToSensorParameterRelations!: AbstractSensorToSensorParameter[];

  @OneToMany(
    () => AbstractSensorToSensorInstance,
    (abstractSensorToSensorInstance) =>
      abstractSensorToSensorInstance.abstractSensor,
  )
  abstractSensorToSensorInstanceRelations!: AbstractSensorToSensorInstance[];

  @OneToMany(
    () => SensorParameterInstance,
    (sensorParameterInstance) => sensorParameterInstance.abstractSensor,
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
