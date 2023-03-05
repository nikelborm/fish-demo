import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreatedEntity,
  CreatedPlainEntity,
  createManyPlain,
  createOneWithRelations,
  NewEntity,
  NewPlainEntity,
} from 'src/tools';
import { Repository } from 'typeorm';
import { SensorParameter } from '../model';

@Injectable()
export class SensorParameterRepo {
  constructor(
    @InjectRepository(SensorParameter)
    private readonly repo: Repository<SensorParameter>,
  ) {}

  async getAll(): Promise<SensorParameter[]> {
    return await this.repo.find();
  }

  async createOneWithRelations(
    newSensorParameter: NewEntity<SensorParameter, 'id'>,
  ): Promise<CreatedEntity<SensorParameter, 'id'>> {
    return await createOneWithRelations(this.repo, newSensorParameter);
  }

  async createManyPlain(
    newSensorParameters: NewPlainEntity<SensorParameter, 'id'>[],
  ): Promise<CreatedPlainEntity<SensorParameter, 'id'>[]> {
    return await createManyPlain(this.repo, newSensorParameters);
  }
}
