import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractSensorToSensorParameter } from '../model';

@Injectable()
export class AbstractSensorToSensorParameterRepo {
  constructor(
    @InjectRepository(AbstractSensorToSensorParameter)
    private readonly repo: Repository<AbstractSensorToSensorParameter>,
  ) {}

  async getAll(): Promise<AbstractSensorToSensorParameter[]> {
    return await this.repo.find();
  }

  async createOne(
    newAbstractSensorToSensorParameter: CreatedOnePlainAbstractSensorToSensorParameter,
  ): Promise<CreatedOnePlainAbstractSensorToSensorParameter> {
    await this.repo.insert(newAbstractSensorToSensorParameter);
    return newAbstractSensorToSensorParameter;
  }

  async createMany(
    newAbstractSensorToSensorParameters: CreatedOnePlainAbstractSensorToSensorParameter[],
  ): Promise<CreatedOnePlainAbstractSensorToSensorParameter[]> {
    await this.repo.insert(newAbstractSensorToSensorParameters);
    return newAbstractSensorToSensorParameters;
  }
}

type PlainKeysGeneratedAfterInsert = never;

type PlainKeysAllowedToModify = 'abstractSensorId' | 'sensorParameterId';

type CreatedOnePlainAbstractSensorToSensorParameter = Pick<
  AbstractSensorToSensorParameter,
  PlainKeysAllowedToModify
>;
