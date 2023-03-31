import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Parser } from 'expr-eval';
import { messages } from 'src/config';
import { groupByKey } from 'src/tools';
import {
  CreateSensorMeasurementDTO,
  FindSensorMeasurementsDTO,
  FlatSensorMeasurement,
} from 'src/types';
import { repo } from '../infrastructure';
import {
  SensorMeasurement,
  SensorMeasurementConstraint,
} from '../infrastructure/model';
import { SensorMeasurementConstraintRepo } from '../infrastructure/repo';
import { SensorMeasurementWSGateway } from './sensorMeasurements.gateway';

@Injectable()
export class SensorMeasurementUseCase {
  constructor(
    private readonly sensorMeasurementRepo: repo.SensorMeasurementRepo,
    private readonly wsGateway: SensorMeasurementWSGateway,
    private readonly sensorMeasurementConstraintRepo: SensorMeasurementConstraintRepo,
    private readonly sensorInstanceRepo: repo.SensorInstanceRepo,
    private readonly alertRepo: repo.AlertRepo,
    private readonly alertTypeRepo: repo.AlertTypeRepo,
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

    const constraints =
      await this.sensorMeasurementConstraintRepo.findAllBySensorParameterInstanceIds(
        [
          ...new Set(
            sensorMeasurements.map(
              (sensorMeasurement) =>
                sensorMeasurement.sensorParameterInstanceId,
            ),
          ),
        ],
      );

    const groupedConstraints = groupByKey(
      constraints,
      'sensorParameterInstanceId',
    );

    await Promise.all(
      insertedSensorMeasurements.map(async (sensorMeasurement) => {
        const filteredConstraints = groupedConstraints.get(
          sensorMeasurement.sensorParameterInstanceId,
        );

        await this.#validateSensorMeasurementAndCreateAlertInCaseOfProblem(
          sensorMeasurement,
          filteredConstraints,
        );
      }),
    );

    this.wsGateway.broadcastManyNew(insertedSensorMeasurements);
    return insertedSensorMeasurements;
  }

  async createSensorMeasurement(
    sensorMeasurement: CreateSensorMeasurementDTO,
  ): Promise<FlatSensorMeasurement> {
    const insertedSensorMeasurement =
      await this.sensorMeasurementRepo.createOnePlain(sensorMeasurement);

    this.wsGateway.broadcastManyNew([insertedSensorMeasurement]);

    const constraints =
      await this.sensorMeasurementConstraintRepo.findAllBySensorParameterInstanceIds(
        [sensorMeasurement.sensorParameterInstanceId],
      );

    await this.#validateSensorMeasurementAndCreateAlertInCaseOfProblem(
      insertedSensorMeasurement,
      constraints,
    );

    return insertedSensorMeasurement;
  }

  async #validateSensorMeasurementAndCreateAlertInCaseOfProblem(
    sensorMeasurement: Required<
      CreateSensorMeasurementDTO & Pick<SensorMeasurement, 'id'>
    >,
    constraintsWithTheSameParameterInstanceId:
      | SensorMeasurementConstraint[]
      | undefined,
  ): Promise<void> {
    if (
      !constraintsWithTheSameParameterInstanceId ||
      constraintsWithTheSameParameterInstanceId.length === 0
    )
      return;

    const doesValueSatisfyConstraints = this.#satisfiesAllConstraints(
      constraintsWithTheSameParameterInstanceId,
      sensorMeasurement.value,
    );

    if (!doesValueSatisfyConstraints)
      await this.#createAlertForExtremeSensorMeasurement(
        sensorMeasurement.sensorParameterInstanceId,
      );
  }

  #satisfiesAllConstraints(
    constraints: SensorMeasurementConstraint[],
    value: number | string,
  ): boolean {
    const isNormal = constraints.every(
      (constraint: SensorMeasurementConstraint) =>
        this.#satisfiesConstraint(+value, constraint),
    );
    return isNormal;
  }

  #satisfiesConstraint(
    value: number,
    constraint: SensorMeasurementConstraint,
  ): boolean {
    const parser = new Parser();
    const expression = parser.parse(constraint.validationFormula);

    const parameters = {
      ...constraint.formulaParameters,
      x: value, //! We accepted that x is reserved for values
    };

    const doesValueSatisfiesConstraint = expression.evaluate(
      parameters,
    ) as unknown;

    if (typeof doesValueSatisfiesConstraint !== 'boolean')
      throw new InternalServerErrorException(
        messages.sensorMeasurementConstraints.doesNotReturnBoolean(
          constraint.id,
          parameters,
        ),
      );

    return doesValueSatisfiesConstraint;
  }

  async #createAlertForExtremeSensorMeasurement(
    sensorParameterInstanceId: number,
  ): Promise<void> {
    const sensorInstance =
      await this.sensorInstanceRepo.getSensorInstanceBySensorParameterInstanceId(
        sensorParameterInstanceId,
      );

    if (!sensorInstance)
      throw new BadRequestException(
        messages.repo.common.cantCreateFKDoNotExist('reservoir'),
      );

    const reservoir = sensorInstance.reservoir;

    const alertTypeDescription = `Reservoir ${reservoir.name} require attention because sensor measurement does not satisfy some of the constraints`;

    let alertType = await this.alertTypeRepo.findOneByExactDescription(
      alertTypeDescription,
    );

    if (!alertType)
      alertType = await this.alertTypeRepo.createOnePlain({
        description: alertTypeDescription,
      });

    await this.alertRepo.createOnePlain({
      reservoir_id: reservoir.id,
      alert_type_id: alertType.id,
      importance: 1,
    });
  }
}
