import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { insertManyPlain, insertOnePlain } from 'src/tools';
import { Repository } from 'typeorm';
import { AbstractSensor } from '../model';

@Injectable()
export class AbstractSensorRepo {
  constructor(
    @InjectRepository(AbstractSensor)
    private readonly repo: Repository<AbstractSensor>,
  ) {}

  async getAll(): Promise<AbstractSensor[]> {
    return await this.repo.find();
  }

  async createOnePlain(
    newAbstractSensor: Pick<AbstractSensor, PlainKeysAllowedToModify>,
  ): Promise<CreatedOnePlainAbstractSensor> {
    return await insertOnePlain<CreatedOnePlainAbstractSensor>(
      this.repo,
      newAbstractSensor,
    );
  }

  async createManyPlain(
    newAbstractSensors: Pick<AbstractSensor, PlainKeysAllowedToModify>[],
  ): Promise<CreatedOnePlainAbstractSensor[]> {
    return await insertManyPlain<CreatedOnePlainAbstractSensor>(
      this.repo,
      newAbstractSensors,
    );
  }
}

type PlainKeysGeneratedAfterInsert = 'id' | 'createdAt' | 'updatedAt';

type PlainKeysAllowedToModify = 'modelName';

type CreatedOnePlainAbstractSensor = Pick<
  AbstractSensor,
  PlainKeysAllowedToModify | PlainKeysGeneratedAfterInsert
>;
