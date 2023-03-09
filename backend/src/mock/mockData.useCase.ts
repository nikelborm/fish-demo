import { BadRequestException, Injectable } from '@nestjs/common';
import { sub } from 'date-fns';
import { assertMockScriptNameIsCorrect } from 'src/config';
import { repo, UserUseCase } from 'src/modules';
import type { CreatedOnePlainAbstractSensor } from 'src/modules/infrastructure/repo';
import { AccessScopeType, SensorParameterValueTypenameEnum } from 'src/types';

@Injectable()
export class MockDataUseCase {
  constructor(
    private readonly userUseCase: UserUseCase,
    private readonly userToAccessScopeRepo: repo.UserToAccessScopeRepo,
    private readonly abstractSensorRepo: repo.AbstractSensorRepo,
    private readonly abstractSensorToSensorInstanceRepo: repo.AbstractSensorToSensorInstanceRepo,
    private readonly abstractSensorToSensorParameterRepo: repo.AbstractSensorToSensorParameterRepo,
    private readonly accessScopeRepo: repo.AccessScopeRepo,
    private readonly reservoirRepo: repo.ReservoirRepo,
    private readonly sensorInstanceRepo: repo.SensorInstanceRepo,
    private readonly sensorMeasurementRepo: repo.SensorMeasurementRepo,
    private readonly sensorParameterInstanceRepo: repo.SensorParameterInstanceRepo,
    private readonly sensorParameterRepo: repo.SensorParameterRepo,
  ) {}

  async executeMock(scriptName?: string): Promise<void> {
    try {
      assertMockScriptNameIsCorrect(scriptName);
    } catch (error) {
      if (error instanceof Error)
        throw new BadRequestException(error.message, { cause: error });
      else throw error;
    }

    console.log(`\n\n\nFILLING STARTED: ${scriptName}\n`);

    await this[scriptName]();

    console.log('\nDATABASE FILLED SUCCESSFULLY\n\n\n');
  }

  async mockUserAndAdminAccessScope(): Promise<void> {
    console.log('mockUserAndAdminAccessScope called');

    const systemAdminScope = await this.accessScopeRepo.createOneWithRelations({
      type: AccessScopeType.SYSTEM_ADMIN,
    });
    console.log('systemAdminScope: ', systemAdminScope);

    const { user } = await this.userUseCase.createUser({
      email: 'asd@asd.asd',
      lastName: 'Такой-тов',
      firstName: 'Такой-то',
      patronymic: 'Такой-тович',
      nickname: 'asdasdasd',
      avatarURL: 'http://google.com',
      gender: 'male',
      password: 'asdasdasd',
    });

    console.log('user: ', user);
    const userToAccessScope = await this.userToAccessScopeRepo.createOne({
      accessScopeId: systemAdminScope.id,
      userId: user.id,
    });
    console.log('userToAccessScope: ', userToAccessScope);
  }

  async mockReservoirAndAllInternals(): Promise<void> {
    console.log('mockReservoirAndAllInternals called');

    let sensorParameters = await this.sensorParameterRepo.getAll();

    if (!sensorParameters.length)
      sensorParameters = (await this.#mockSensorParameters()).sensorParameters;

    const reservoir = await this.reservoirRepo.createOnePlain({
      name: `Бассейн №${Math.random()}`,
    });
    console.log('reservoir: ', reservoir);
    const { abstractSensor: abstractSensor1 } = await this.#mockAbstractSensor(
      sensorParameters,
    );
    const { abstractSensor: abstractSensor2 } = await this.#mockAbstractSensor(
      sensorParameters,
    );

    await this.#mockManySensorInstances(reservoir, [
      abstractSensor1,
      abstractSensor2,
    ]);
  }

  async mockSensorMeasurements(): Promise<void> {
    const sensorParameterInstances =
      await this.sensorParameterInstanceRepo.getAllWithParameters();
    await Promise.all(
      sensorParameterInstances.map(({ id, sensorParameter: { shortName } }) =>
        this.sensorMeasurementRepo.createManyPlain(
          this.#getFakeMeasurements(
            id,
            shortName === 'o2' ? 0.85 : shortName === 'T' ? 20 : 5,
            shortName === 'o2' ? 1.2 : shortName === 'T' ? 40 : 8,
          ),
        ),
      ),
    );
  }

  async #mockManySensorInstances(
    reservoir: repo.CreatedOnePlainReservoir,
    abstractSensors: (CreatedOnePlainAbstractSensor & {
      sensorParameters: repo.CreatedOnePlainSensorParameter[];
    })[],
  ): Promise<number[]> {
    const generateMockSensorInstances = (): Promise<{
      sensorInstance: repo.CreatedOnePlainSensorInstance;
      sensorParameterInstances: repo.CreatedOnePlainSensorParameterInstance[];
    }>[] =>
      abstractSensors.map((abstractSensor) =>
        this.#mockSensorInstance(reservoir, abstractSensor),
      );

    const sensorParameterInstanceIds = (
      await Promise.all([
        ...generateMockSensorInstances(),
        ...generateMockSensorInstances(),
      ])
    )
      .flatMap(({ sensorParameterInstances }) => sensorParameterInstances)
      .map(({ id }) => id);
    console.log('sensorParameterInstanceIds: ', sensorParameterInstanceIds);
    return sensorParameterInstanceIds;
  }

  async #mockSensorParameters(): Promise<{
    sensorParameters: [
      //[tempSensorParameter, oxygenSensorParameter, pHSensorParameter]
      repo.CreatedOnePlainSensorParameter,
      repo.CreatedOnePlainSensorParameter,
      repo.CreatedOnePlainSensorParameter,
    ];
  }> {
    const sensorParameters = await this.sensorParameterRepo.createManyPlain([
      {
        name: 'Температура',
        shortName: 'T',
        valueTypeName: SensorParameterValueTypenameEnum.NUMBER,
        unit: '°C',
      },
      {
        name: 'Кислород',
        shortName: 'o2',
        valueTypeName: SensorParameterValueTypenameEnum.NUMBER,
        unit: '%',
      },
      {
        name: 'Кислотность',
        shortName: 'pH',
        valueTypeName: SensorParameterValueTypenameEnum.NUMBER,
        unit: '',
      },
    ]);
    console.log('sensorParameters: ', sensorParameters);
    return {
      sensorParameters: sensorParameters as [
        repo.CreatedOnePlainSensorParameter,
        repo.CreatedOnePlainSensorParameter,
        repo.CreatedOnePlainSensorParameter,
      ],
    };
  }

  async #mockAbstractSensor(
    sensorParameters: repo.CreatedOnePlainSensorParameter[],
  ): Promise<{
    abstractSensor: repo.CreatedOnePlainAbstractSensor & {
      sensorParameters: repo.CreatedOnePlainSensorParameter[];
    };
  }> {
    const abstractSensor = await this.abstractSensorRepo.createOnePlain({
      modelName: `CHR 3000${Math.random()}`,
    });
    console.log('abstractSensor: ', abstractSensor);

    const abstractSensorToSensorParameter =
      await this.abstractSensorToSensorParameterRepo.createMany(
        sensorParameters.map(({ id: sensorParameterId }) => ({
          sensorParameterId,
          abstractSensorId: abstractSensor.id,
        })),
      );
    console.log(
      'abstractSensorToSensorParameter: ',
      abstractSensorToSensorParameter,
    );
    return {
      abstractSensor: { ...abstractSensor, sensorParameters },
    };
  }

  async #mockSensorInstance(
    reservoir: repo.CreatedOnePlainReservoir,
    abstractSensorWithJoinedParameters: CreatedOnePlainAbstractSensor & {
      sensorParameters: repo.CreatedOnePlainSensorParameter[];
    },
  ): Promise<{
    sensorInstance: repo.CreatedOnePlainSensorInstance;
    sensorParameterInstances: repo.CreatedOnePlainSensorParameterInstance[];
  }> {
    const sensorInstance = await this.sensorInstanceRepo.createOnePlain({
      reservoirId: reservoir.id,
    });
    console.log('sensorInstance: ', sensorInstance);

    const abstractSensorToSensorInstance =
      await this.abstractSensorToSensorInstanceRepo.createOne({
        abstractSensorId: abstractSensorWithJoinedParameters.id,
        sensorInstanceId: sensorInstance.id,
      });

    console.log(
      'abstractSensorToSensorInstance: ',
      abstractSensorToSensorInstance,
    );
    const sensorParameterInstances =
      await this.sensorParameterInstanceRepo.createManyPlain(
        abstractSensorWithJoinedParameters.sensorParameters.map(({ id }) => ({
          sensorParameterId: id,
          abstractSensorId: abstractSensorWithJoinedParameters.id,
          sensorInstanceId: sensorInstance.id,
        })),
      );
    console.log('sensorParameterInstances: ', sensorParameterInstances);
    return { sensorInstance, sensorParameterInstances };
  }

  #getFakeMeasurements(
    sensorParameterInstanceId: number,
    minValue: number,
    maxValue: number,
  ): repo.PlainSensorMeasurementToInsert[] {
    const sinDegrees = (angleDegrees: number): number =>
      Math.sin((angleDegrees * Math.PI) / 180);
    return Array.from({ length: 720 }, (_, i) => i)
      .map(
        (v): repo.PlainSensorMeasurementToInsert => ({
          sensorParameterInstanceId,
          recordedAt: sub(new Date(), { seconds: 720 - v + Math.random() * 3 }),
          value:
            minValue +
            0.8 *
              (((sinDegrees(v + Math.random() * 60) + 1) / 2) *
                (maxValue - minValue) +
                ((maxValue - minValue) / 5) * Math.random()) -
            1 +
            Math.random(),
        }),
      )
      .sort(
        ({ recordedAt: a }, { recordedAt: b }) => a.getTime() - b.getTime(),
      );
  }
}
