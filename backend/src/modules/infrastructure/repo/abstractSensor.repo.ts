import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreatedEntity,
  CreatedPlainEntity,
  createManyWithRelations,
  createOnePlain,
  NewEntity,
  NewPlainEntity,
} from 'src/tools';
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
    newAbstractSensor: NewPlainEntity<AbstractSensor, 'id'>,
  ): Promise<CreatedPlainEntity<AbstractSensor, 'id'>> {
    return await createOnePlain(this.repo, newAbstractSensor);
  }

  async createManyWithRelations(
    newAbstractSensors: NewEntity<AbstractSensor, 'id'>[],
  ): Promise<CreatedEntity<AbstractSensor, 'id'>[]> {
    return await createManyWithRelations(this.repo, newAbstractSensors);
  }
}
