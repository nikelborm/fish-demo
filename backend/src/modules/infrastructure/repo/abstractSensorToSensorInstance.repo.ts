import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractSensorToSensorInstance } from '../model';

@Injectable()
export class AbstractSensorToSensorInstanceRepo {
  constructor(
    @InjectRepository(AbstractSensorToSensorInstance)
    private readonly repo: Repository<AbstractSensorToSensorInstance>,
  ) {}

  async getAll(): Promise<AbstractSensorToSensorInstance[]> {
    return await this.repo.find();
  }

  async createOne(newAbstractSensorToSensorInstance: {
    abstractSensorId: number;
    sensorInstanceId: number;
  }): Promise<void> {
    await this.repo.insert(newAbstractSensorToSensorInstance);
  }
}
