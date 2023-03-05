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

  async createOne(newAbstractSensorToSensorParameter: {
    abstractSensorId: number;
    sensorParameterId: number;
  }): Promise<void> {
    await this.repo.insert(newAbstractSensorToSensorParameter);
  }

  async createMany(
    newAbstractSensorToSensorParameters: {
      abstractSensorId: number;
      sensorParameterId: number;
    }[],
  ): Promise<void> {
    await this.repo.insert(newAbstractSensorToSensorParameters);
  }
}
