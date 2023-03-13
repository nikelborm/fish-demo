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
import { AbstractSensorToSensorParameter } from '../model';

@Injectable()
export class AbstractSensorToSensorParameterRepo {
  constructor(
    @InjectRepository(AbstractSensorToSensorParameter)
    private readonly repo: Repository<AbstractSensorToSensorParameter>,
  ) {}

  getAll = getAllEntities(this.repo)<Config>();

  findOneByIdentity = findOnePlainByIdentity(this.repo)<Config>();

  createOnePlain = createOnePlain(this.repo)<Config>();
  createManyPlain = createManyPlain(this.repo)<Config>();

  updateManyPlain = updateManyPlain(this.repo)<Config>();
  updateOnePlain = updateOnePlain(this.repo)<Config>();

  updateManyWithRelations = updateManyWithRelations(this.repo)<Config>();
  updateOneWithRelations = updateOneWithRelations(this.repo)<Config>();

  deleteOne = deleteEntityByIdentity(this.repo)<Config>();
}

type RepoTypes = EntityRepoMethodTypes<
  AbstractSensorToSensorParameter,
  {
    EntityName: 'AbstractSensorToSensorParameter';
    RequiredToCreateAndSelectRegularPlainKeys: null;
    OptionalToCreateAndSelectRegularPlainKeys: null;

    ForbiddenToCreateGeneratedPlainKeys: null;
    ForbiddenToUpdatePlainKeys: 'abstractSensorId' | 'sensorParameterId';
    ForbiddenToUpdateRelationKeys: null;
    UnselectedByDefaultPlainKeys: null;
  }
>;

type Config = RepoTypes['Config'];
