import { Injectable } from '@nestjs/common';
import {
  CreateSensorMeasurementDTO,
  FindSensorMeasurementsDTO,
  FlatSensorMeasurement,
  SensorParameterValueType,
} from 'src/types';
import { repo } from '../infrastructure';
import { SensorMeasurementConstraintRepo } from '../infrastructure/repo';
import { SensorMeasurementWSGateway } from './sensorMeasurements.gateway';
import { groupByKey } from 'src/tools';

@Injectable()
export class SensorMeasurementUseCase {
  constructor(
    private readonly sensorMeasurementRepo: repo.SensorMeasurementRepo,
    private readonly wsGateway: SensorMeasurementWSGateway,
    private readonly sensorMeasurementConstraintRepo: SensorMeasurementConstraintRepo,
  ) {}

  async findManyWith(
    searchOptions: FindSensorMeasurementsDTO,
  ): Promise<FlatSensorMeasurement[]> {
    return await this.sensorMeasurementRepo.findManyWith(searchOptions);
  }

  async createManySensorMeasurements(
    sensorMeasurements: CreateSensorMeasurementDTO[],
  ): Promise<FlatSensorMeasurement[]> {
    const insertedSensorMeasurements =
      await this.sensorMeasurementRepo.createManyPlain(sensorMeasurements);
    const sensorParameterInstanceIds = sensorMeasurements.map(
      (sensorMeasurement) => sensorMeasurement.sensorParameterInstanceId,
    );
    const uniqueSensorParameterInstanceIds = [
      ...new Set(sensorParameterInstanceIds),
    ];
    const constraints =
      await this.sensorMeasurementConstraintRepo.findAllBySensorParameterInstanceIds(
        uniqueSensorParameterInstanceIds,
      );
    function satisfiesAllConstraints(
      value: SensorParameterValueType,
      constraintArr: typeof constraints,
    ): boolean {
      return true;
    }

    function createAlertForExtremeSensorMeasurement(...args: any[]): void {
      return;
    }

    const groupedConstraints = groupByKey(
      constraints,
      'sensorParameterInstanceId',
    );
    for (const sensorMeasurement of sensorMeasurements) {
      const filteredConstraints = groupedConstraints.get(
        sensorMeasurement.sensorParameterInstanceId,
      );
      let doesValueSatisfyConstraints = false;
      if (!filteredConstraints) {
        doesValueSatisfyConstraints = true;
      } else {
        doesValueSatisfyConstraints = satisfiesAllConstraints(
          sensorMeasurement.value,
          filteredConstraints,
        );
      }
      if (!doesValueSatisfyConstraints) {
        createAlertForExtremeSensorMeasurement();
      }
    }

    this.wsGateway.broadcastManyNew(insertedSensorMeasurements);
    return insertedSensorMeasurements;
  }

  async createSensorMeasurement(
    sensorMeasurement: CreateSensorMeasurementDTO,
  ): Promise<FlatSensorMeasurement> {
    const insertedSensorMeasurement =
      await this.sensorMeasurementRepo.createOnePlain(sensorMeasurement);
    this.wsGateway.broadcastManyNew([insertedSensorMeasurement]);
    const sensorParameterInstanceId =
      sensorMeasurement.sensorParameterInstanceId;
    const constraints =
      await this.sensorMeasurementConstraintRepo.findAllBySensorParameterInstanceIds(
        [sensorParameterInstanceId],
      );
    function satisfiesAllConstraints(
      value: SensorParameterValueType,
      constraintArr: typeof constraints,
    ): boolean {
      return true;
    }

    function createAlertForExtremeSensorMeasurement(...args: any[]): void {
      return;
    }
    const groupedConstraints = groupByKey(
      constraints,
      'sensorParameterInstanceId',
    );
    const filteredConstraints = groupedConstraints.get(
      sensorMeasurement.sensorParameterInstanceId,
    );
    let doesValueSatisfyConstraints = false;
    if (!filteredConstraints) {
      doesValueSatisfyConstraints = true;
    } else {
      doesValueSatisfyConstraints = satisfiesAllConstraints(
        sensorMeasurement.value,
        filteredConstraints,
      );
    }
    if (!doesValueSatisfyConstraints) {
      createAlertForExtremeSensorMeasurement();
    }
    return insertedSensorMeasurement;
  }
}
