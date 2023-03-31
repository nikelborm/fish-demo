import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  createManyPlain,
  createOnePlain,
  deleteEntityByIdentity,
  findOnePlainByIdentity,
  getAllEntities,
  updateManyPlain,
  updateManyWithRelations,
  updateOnePlain,
  updateOneWithRelations,
} from 'src/tools';
import type { EntityRepoMethodTypes } from 'src/types';
import { Repository } from 'typeorm';
import { SensorInstance } from '../model';
import { SelectedOnePlainReservoir } from './reservoir.repo';

@Injectable()
export class SensorInstanceRepo {
  constructor(
    @InjectRepository(SensorInstance)
    private readonly repo: Repository<SensorInstance>,
  ) {}

  getAll = getAllEntities(this.repo)<Config>();

  async getSensorInstanceBySensorParameterInstanceId(
    sensorParameterInstanceId: number,
  ): Promise<
    | (RepoTypes['SelectedOnePlainEntity'] & {
        reservoir: SelectedOnePlainReservoir;
      })
    | null
  > {
    return await this.repo
      .createQueryBuilder('sensorInstance')
      .leftJoinAndSelect(
        'sensorInstance.sensorParameterInstance',
        'sensorParameterInstance',
      )
      .leftJoinAndSelect('sensorInstance.reservoir', 'reservoir')
      .where('sensorParameterInstance.sensorParameterInstanceId = :id', {
        id: sensorParameterInstanceId,
      })
      .select([
        'sensorInstance.id',
        'sensorInstance.createdAt',
        'sensorInstance.updatedAt',
        'reservoir.id',
        'reservoir.createdAt',
        'reservoir.updatedAt',
        'reservoir.name',
        'reservoir.fishCount',
        'reservoir.fishBatchId',
      ])
      .getOne();
  }

  findOneById = async (
    id: number,
  ): Promise<RepoTypes['SelectedOnePlainEntity'] | null> =>
    await findOnePlainByIdentity(this.repo)<Config>()({ id });

  createOnePlain = createOnePlain(this.repo)<Config>();
  createManyPlain = createManyPlain(this.repo)<Config>();

  updateManyPlain = updateManyPlain(this.repo)<Config>();
  updateOnePlain = updateOnePlain(this.repo)<Config>();

  updateManyWithRelations = updateManyWithRelations(this.repo)<Config>();
  updateOneWithRelations = updateOneWithRelations(this.repo)<Config>();

  deleteOneById = async (id: number): Promise<void> =>
    await deleteEntityByIdentity(this.repo)<Config>()({ id });
}

type RepoTypes = EntityRepoMethodTypes<
  SensorInstance,
  {
    EntityName: 'SensorInstance';
    RequiredToCreateAndSelectRegularPlainKeys: 'createdAt' | 'updatedAt';
    OptionalToCreateAndSelectRegularPlainKeys: null;

    ForbiddenToCreateGeneratedPlainKeys: 'id' | 'createdAt' | 'updatedAt';
    ForbiddenToUpdatePlainKeys: 'id' | 'createdAt' | 'updatedAt';
    ForbiddenToUpdateRelationKeys: null;
    UnselectedByDefaultPlainKeys: null;
  }
>;

type Config = RepoTypes['Config'];
