import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  groupByKey,
  createManyPlain,
  createOnePlain,
  getAllEntities,
  findOnePlainByIdentity,
  updateManyPlain,
  updateOnePlain,
  updateManyWithRelations,
  updateOneWithRelations,
  deleteEntityByIdentity,
} from 'src/tools';
import type { EntityRepoMethodTypes, ReservoirInfoDTO } from 'src/types';
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
  ): Promise<ReservoirInfoDTO | null> {
    const rawResults = await this.repo.query(
      `
      SELECT
        -- reservoir {
          "reservoir_id",
          "reservoir"."name" AS "reservoir_name",
          -- sensorInstances {
            "sensor_instance_id",
            -- abstractSensor {
              "abstract_sensor_id",
              "model_name",
            -- abstractSensor }
            -- sensorParameterInstances {
              "sensor_parameter_instance_id",
              -- sensorParameter {
                "sensor_parameter_id",
                "unit",
                "sensor_parameter"."name" AS "sensor_parameter_name",
                "short_name",
                "value_type_name"
              -- sensorParameter }
            -- sensorParameterInstances }
          -- sensorInstances }
        --  reservoir }
      FROM "reservoir"
        LEFT JOIN "sensor_instance"                    USING ("reservoir_id")
        LEFT JOIN "abstract_sensor_to_sensor_instance" USING ("sensor_instance_id")
        LEFT JOIN "abstract_sensor"                    USING ("abstract_sensor_id")
        LEFT JOIN "sensor_parameter_instance"          USING ("abstract_sensor_id", "sensor_instance_id")
        LEFT JOIN "sensor_parameter"                   USING ("sensor_parameter_id")
      WHERE "reservoir_id" = $1;
    `,
      [reservoirId],
    );
    if (!rawResults.length) return null;
    return this.#iHateTypeormAndWasForcedWithNoOtherChoiceToWriteThisFuckingCursedRemap(
      rawResults,
    )[0] as ReservoirInfoDTO;
  }

  getAll = getAllEntities(this.repo)<Config>();

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

  #iHateTypeormAndWasForcedWithNoOtherChoiceToWriteThisFuckingCursedRemap(
    asd2: RawResultsItemType[],
  ): any[] {
    return [...groupByKey(asd2, 'reservoir_id').entries()].map(
      ([reservoirId, recordsWithThatReservoirId]) => {
        let rowsWithSensorInstances = [
          ...groupByKey(
            recordsWithThatReservoirId,
            'sensor_instance_id',
          ).entries(),
        ];
        if (rowsWithSensorInstances[0]?.[0] === null)
          rowsWithSensorInstances = [];
        return {
          id: reservoirId,
          name: recordsWithThatReservoirId[0]!.reservoir_name,
          sensorInstances: rowsWithSensorInstances.map(
            ([sensorInstanceId, recordsWithThatSensorInstanceId]) => {
              let rowsWithSensorParameterInstances = [
                ...groupByKey(
                  recordsWithThatSensorInstanceId,
                  'sensor_parameter_instance_id',
                ).entries(),
              ];
              if (!recordsWithThatSensorInstanceId[0]!.abstract_sensor_id)
                return {
                  id: sensorInstanceId,
                };
              if (rowsWithSensorParameterInstances[0]?.[0] === null)
                rowsWithSensorParameterInstances = [];
              return {
                id: sensorInstanceId,
                abstractSensorToSensorInstance: {
                  abstractSensor: {
                    id: recordsWithThatSensorInstanceId[0]!.abstract_sensor_id,
                    modelName: recordsWithThatSensorInstanceId[0]!.model_name,
                  },
                  sensorParameterInstances:
                    rowsWithSensorParameterInstances.map(
                      ([
                        sensorParameterInstanceId,
                        recordsWithThatSensorParameterInstanceId,
                      ]) => ({
                        id: sensorParameterInstanceId,
                        sensorParameter: {
                          id: recordsWithThatSensorParameterInstanceId[0]![
                            'sensor_parameter_id'
                          ],
                          name: recordsWithThatSensorParameterInstanceId[0]![
                            'sensor_parameter_name'
                          ],
                          shortName:
                            recordsWithThatSensorParameterInstanceId[0]![
                              'short_name'
                            ],
                          unit: recordsWithThatSensorParameterInstanceId[0]![
                            'unit'
                          ],
                          valueTypeName:
                            recordsWithThatSensorParameterInstanceId[0]![
                              'value_type_name'
                            ],
                        },
                      }),
                    ),
                },
              };
            },
          ),
        };
      },
    );
  }
}

type RepoTypes = EntityRepoMethodTypes<
  Reservoir,
  {
    EntityName: 'Reservoir';
    RequiredToCreateAndSelectRegularPlainKeys:
      | 'createdAt'
      | 'updatedAt'
      | 'name'
      | 'fishCount'
      | 'fishBatchId'
      | 'name';
    OptionalToCreateAndSelectRegularPlainKeys: null;

    ForbiddenToCreateGeneratedPlainKeys: 'id' | 'createdAt' | 'updatedAt';
    ForbiddenToUpdatePlainKeys: 'id' | 'createdAt' | 'updatedAt';
    ForbiddenToUpdateRelationKeys: null;
    UnselectedByDefaultPlainKeys: null;
  }
>;

type Config = RepoTypes['Config'];

// select: {
//   id: true,
//   name: true,
//   sensorInstances: {
//     id: true,
//     abstractSensorToSensorInstance: {
//       abstractSensorId: true,
//       sensorInstanceId: true,
//       abstractSensor: {
//         id: true,
//         modelName: true,
//       },
//       sensorParameterInstances: {
//         id: true,
//         sensorParameter: {
//           id: true,
//           name: true,
//           unit: true,
//           valueTypeName: true,
//         },
//       },
//     },
//   },
// },

type RawResultsItemType = {
  reservoir_id: number;
  reservoir_name: string;
  sensor_instance_id: number | null;
  abstract_sensor_id: number;
  model_name: string;
  sensor_parameter_instance_id: number | null;
  sensor_parameter_id: number;
  unit: string;
  sensor_parameter_name: string;
  short_name: string;
  value_type_name: string;
};

export type SelectedOnePlainReservoir = RepoTypes['SelectedOnePlainEntity'];
