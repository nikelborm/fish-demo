import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  createManyWithRelations,
  createOneWithRelations,
  NewPlainEntity,
} from 'src/tools';
import { SensorParameterValueTypenameEnum } from 'src/types';
import { Repository } from 'typeorm';
import { Reservoir } from '../model';

@Injectable()
export class ReservoirRepo {
  constructor(
    @InjectRepository(Reservoir)
    private readonly repo: Repository<Reservoir>,
  ) {}

  async getReservoirFullInfo(
    reservoirId: number,
  ): Promise<ReservoirFullInfo | null> {
    return await this.repo.findOne({
      where: { id: reservoirId },
      select: {
        id: true,
        name: true,
        sensorInstances: {
          id: true,
          abstractSensorToSensorInstance: {
            abstractSensor: {
              id: true,
              modelName: true,
            },
            sensorParameterInstances: {
              id: true,
              sensorParameter: {
                id: true,
                name: true,
                unit: true,
                valueTypeName: true,
              },
            },
          },
        },
      },
      relations: {
        sensorInstances: {
          abstractSensorToSensorInstance: {
            abstractSensor: true,
            sensorParameterInstances: {
              sensorParameter: true,
            },
          },
        },
      },
    });
  }

  async createOne(
    newReservoir: NewPlainEntity<Reservoir, 'id'>,
  ): Promise<Reservoir> {
    return (await createOneWithRelations(this.repo, newReservoir)) as Reservoir;
  }

  async createMany(
    newReservoirs: NewPlainEntity<Reservoir, 'id'>[],
  ): Promise<Reservoir[]> {
    return (await createManyWithRelations(
      this.repo,
      newReservoirs,
    )) as Reservoir[];
  }
}

type ReservoirFullInfo = {
  id: number;
  name: string;
  sensorInstances: {
    id: number;
    abstractSensorToSensorInstance: {
      abstractSensor: {
        id: number;
        modelName: string;
      };
      sensorParameterInstances: {
        id: number;
        sensorParameter: {
          id: number;
          name: string;
          unit: string;
          valueTypeName: SensorParameterValueTypenameEnum;
        };
      }[];
    };
  }[];
};
