import { PrimaryIdentityColumn } from 'src/tools';
import type { ISensorMeasurementConstraint } from 'src/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { SensorParameterInstance } from './sensorParameterInstance.model';

@Entity({ name: 'sensor_measurement_constraint' })
export class SensorMeasurementConstraint
  implements ISensorMeasurementConstraint
{
  @PrimaryIdentityColumn('sensor_measurement_constraint_id')
  id!: number;

  @ManyToOne(
    () => SensorParameterInstance,
    (sensorParameterInstance) =>
      sensorParameterInstance.sensorMeasurementConstraints,
  )
  @JoinColumn({ name: 'sensor_parameter_instance_id' })
  sensorParameterInstance!: SensorParameterInstance;

  @Column({
    name: 'sensor_parameter_instance_id',
    nullable: false,
  })
  sensorParameterInstanceId!: number;

  @Column({
    name: 'validation_formula',
    nullable: false,
  })
  validationFormula!: string;

  @Column({
    name: 'formula_parameters',
    nullable: false,
    type: 'jsonb',
  })
  formulaParameters!: Record<string, any>;

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
