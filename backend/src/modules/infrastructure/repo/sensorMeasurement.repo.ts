import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  createManyPlain,
  createOnePlain,
  deleteEntityByIdentity,
  updateManyPlain,
  updateManyWithRelations,
  updateOnePlain,
  updateOneWithRelations,
} from 'src/tools';
import type {
  EntityRepoMethodTypes,
  FindSensorMeasurementsDTO,
} from 'src/types';
import { Between, Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { SensorMeasurement } from '../model';

@Injectable()
export class SensorMeasurementRepo {
  constructor(
    @InjectRepository(SensorMeasurement)
    private readonly repo: Repository<SensorMeasurement>,
  ) {}

  async getAll(): Promise<RepoTypes['SelectedOnePlainEntity'][]> {
    return await this.repo.find({
      order: { recordedAt: 'desc' },
    });
  }

  async getLatestMeasurementsWhereSensorInstanceHas(
    reservoirId: number,
  ): Promise<RepoTypes['SelectedOnePlainEntity'][]> {
    return await this.repo
      .createQueryBuilder('sensorMeasurement')
      .select([
        'sensorMeasurement.id',
        'sensorMeasurement.sensorParameterInstanceId',
        'sensorMeasurement.recordedAt',
        'sensorMeasurement.value',
      ])
      .distinctOn(['sensorMeasurement.sensorParameterInstanceId'])
      .innerJoin(
        'sensorMeasurement.sensorParameterInstance',
        'sensorParameterInstance',
      )
      .innerJoin('sensorParameterInstance.sensorInstance', 'sensorInstance')
      .where('sensorInstance.reservoirId = :reservoirId')
      .orderBy('sensorMeasurement.sensorParameterInstanceId', 'DESC')
      .addOrderBy('sensorMeasurement.recordedAt', 'DESC')
      .addOrderBy('sensorMeasurement.id', 'DESC')
      .setParameters({
        reservoirId,
      })
      .getMany();
  }

  async findManyWith({
    reservoirId,
    maxDate,
    minDate,
  }: FindSensorMeasurementsDTO): Promise<
    Omit<SensorMeasurement, 'sensorParameterInstance'>[]
  > {
    return await this.repo.find({
      order: { recordedAt: 'desc' },
      select: {
        id: true,
        recordedAt: true,
        value: true,
        sensorParameterInstance: {
          id: false,
        },
        sensorParameterInstanceId: true,
      },
      where: {
        sensorParameterInstance: {
          sensorInstance: {
            reservoirId,
          },
        },
        ...(minDate && maxDate && { recordedAt: Between(minDate, maxDate) }),
        ...(minDate && !maxDate && { recordedAt: MoreThanOrEqual(minDate) }),
        ...(!minDate && maxDate && { recordedAt: LessThanOrEqual(maxDate) }),
      },
      relations: {
        sensorParameterInstance: {
          sensorInstance: true,
        },
      },
    });
  }

  createOnePlain = createOnePlain(this.repo)<Config>();
  createManyPlain = createManyPlain(this.repo)<Config>();

  updateManyPlain = updateManyPlain(this.repo)<Config>();
  updateOnePlain = updateOnePlain(this.repo)<Config>();

  updateManyWithRelations = updateManyWithRelations(this.repo)<Config>();
  updateOneWithRelations = updateOneWithRelations(this.repo)<Config>();

  deleteOneById = async (id: string): Promise<void> =>
    await deleteEntityByIdentity(this.repo)<Config>()({ id });
}

type RepoTypes = EntityRepoMethodTypes<
  SensorMeasurement,
  {
    EntityName: 'SensorMeasurement';
    RequiredToCreateAndSelectRegularPlainKeys:
      | 'recordedAt'
      | 'value'
      | 'sensorParameterInstanceId';
    OptionalToCreateAndSelectRegularPlainKeys: null;

    ForbiddenToCreateGeneratedPlainKeys: 'id';
    ForbiddenToUpdatePlainKeys: 'id';
    ForbiddenToUpdateRelationKeys: null;
    UnselectedByDefaultPlainKeys: null;
  }
>;

type Config = RepoTypes['Config'];

export type OnePlainSensorMeasurementToBeCreated =
  RepoTypes['OnePlainEntityToBeCreated'];
