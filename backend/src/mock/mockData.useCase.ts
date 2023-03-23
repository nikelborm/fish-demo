import { BadRequestException, Injectable } from '@nestjs/common';
import { sub } from 'date-fns';
import { assertMockScriptNameIsCorrect } from 'src/config';
import { model, repo, UserUseCase } from 'src/modules';
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
    private readonly fishBatchRepo: repo.FishBatchRepo,
    private readonly fishKindRepo: repo.FishKindRepo,
    private readonly eventRepo: repo.EventRepo,
    private readonly eventTypeRepo: repo.EventTypeRepo,
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

    const systemAdminScope = await this.accessScopeRepo.createOnePlain({
      type: AccessScopeType.SYSTEM_ADMIN,
    });
    console.log('systemAdminScope: ', systemAdminScope);

    const user = await this.userUseCase.createUser({
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
    const userToAccessScope = await this.userToAccessScopeRepo.createOnePlain({
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

    let mockFishBatch = (await this.#mockFishBatch()).fishBatch;

    const reservoir = await this.reservoirRepo.createOnePlain({
      name: `Бассейн №${Math.random()}`,
      fish_count: 2,
      fish_part_id: mockFishBatch.id,
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

    await this.#mockEvent(reservoir);
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
    reservoir: CreatedOnePlainReservoir,
    abstractSensors: (CreatedOnePlainAbstractSensor & {
      sensorParameters: CreatedOnePlainSensorParameter[];
    })[],
  ): Promise<number[]> {
    const generateMockSensorInstances = (): Promise<{
      sensorInstance: CreatedOnePlainSensorInstance;
      sensorParameterInstances: CreatedOnePlainSensorParameterInstance[];
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
      CreatedOnePlainSensorParameter,
      CreatedOnePlainSensorParameter,
      CreatedOnePlainSensorParameter,
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
        CreatedOnePlainSensorParameter,
        CreatedOnePlainSensorParameter,
        CreatedOnePlainSensorParameter,
      ],
    };
  }

  async #mockAbstractSensor(
    sensorParameters: CreatedOnePlainSensorParameter[],
  ): Promise<{
    abstractSensor: CreatedOnePlainAbstractSensor & {
      sensorParameters: CreatedOnePlainSensorParameter[];
    };
  }> {
    const abstractSensor = await this.abstractSensorRepo.createOnePlain({
      modelName: `CHR 3000${Math.random()}`,
    });
    console.log('abstractSensor: ', abstractSensor);

    const abstractSensorToSensorParameter =
      await this.abstractSensorToSensorParameterRepo.createManyPlain(
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
    reservoir: CreatedOnePlainReservoir,
    abstractSensorWithJoinedParameters: CreatedOnePlainAbstractSensor & {
      sensorParameters: CreatedOnePlainSensorParameter[];
    },
  ): Promise<{
    sensorInstance: CreatedOnePlainSensorInstance;
    sensorParameterInstances: CreatedOnePlainSensorParameterInstance[];
  }> {
    const sensorInstance = await this.sensorInstanceRepo.createOnePlain({
      reservoirId: reservoir.id,
    });
    console.log('sensorInstance: ', sensorInstance);

    const abstractSensorToSensorInstance =
      await this.abstractSensorToSensorInstanceRepo.createOnePlain({
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
  ): repo.OnePlainSensorMeasurementToBeCreated[] {
    const sinDegrees = (angleDegrees: number): number =>
      Math.sin((angleDegrees * Math.PI) / 180);
    return Array.from({ length: 720 }, (_, i) => i)
      .map(
        (v): repo.OnePlainSensorMeasurementToBeCreated => ({
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

  async #mockFishBatch(): Promise<{
    fishBatch: CreatedOnePlainFishBatch,
    fishKind: CreatedOnePlainFishKind,
  }> {
    const fishKind = await this.fishKindRepo.createOnePlain(
      {
        name: 'Пробный вид',
        description: 'Какой-то вид рыбы',
      }
    )
    const fishBatch = await this.fishBatchRepo.createOnePlain(
      {
        name: 'Пробная партия',
        age: 2,
        fishKindId: fishKind.id,
      }
      );
    console.log('fishBatch: ', fishBatch);
    return {
      fishBatch: fishBatch as CreatedOnePlainFishBatch,
      fishKind: fishKind as CreatedOnePlainFishKind,
    };
  }

  async #mockEvent(
    reservoir: CreatedOnePlainReservoir
    ): Promise<{
    event: CreatedOnePlainEvent
    eventType: CreatedOnePlainEventType
  }> {
    const eventType = await this.eventTypeRepo.createOnePlain(
      {
        name: 'Пробное событие',
        description: 'Пробное событие для тестирования',
      }
    )
    const event = await this.eventRepo.createOnePlain(
      {
        description: 'Был создан пробный бассейн',
        eventTypeId: eventType.id,
        reservoirId: reservoir.id,
        completionTime: sub(new Date(), { seconds: 720 + Math.random() * 3 }),
      }
      );
    console.log('event: ', event);
    return {
      event: event as CreatedOnePlainEvent,
      eventType: eventType as CreatedOnePlainEventType,
    };
  }

}

type CreatedOnePlainSensorParameter = Required<
  {
    name: string;
    shortName: string;
    valueTypeName: SensorParameterValueTypenameEnum;
    unit: string;
  } & Pick<model.SensorParameter, 'id' | 'createdAt' | 'updatedAt'>
>;

type CreatedOnePlainAbstractSensor = Required<
  {
    modelName: string;
  } & Pick<model.AbstractSensor, 'id' | 'createdAt' | 'updatedAt'>
>;

type CreatedOnePlainSensorInstance = Required<
  {
    reservoirId: number;
  } & Pick<model.SensorInstance, 'id' | 'createdAt' | 'updatedAt'>
>;

type CreatedOnePlainSensorParameterInstance = Required<
  {
    sensorParameterId: number;
    abstractSensorId: number;
    sensorInstanceId: number;
  } & Pick<model.SensorParameterInstance, 'id' | 'createdAt' | 'updatedAt'>
>;

type CreatedOnePlainFishBatch = Required<
  {
    name: string;
    fishKindId: number;
    age: number;
  } & Pick<model.FishBatch, 'id' | 'createdAt' | 'updatedAt'>
>;

type CreatedOnePlainFishKind = Required<
  {
    name: string;
    description: string;
  } & Pick<model.FishKind, 'id' | 'createdAt' | 'updatedAt'>
>;

type CreatedOnePlainEvent = Required<
  {
    description: string;
    eventTypeId: number;
    reservoirId: number;
    completionTime: Date;
  } & Pick<model.Event, 'id' | 'createdAt' | 'updatedAt'>
>;

type CreatedOnePlainEventType = Required<
  {
    name: string;
    description: string;
  } & Pick<model.EventType, 'id' | 'createdAt' | 'updatedAt'>
>;

type CreatedOnePlainReservoir = Required<
  {
    name: string;
    fish_count: number;
    fish_part_id: number;
  } & Pick<model.Reservoir, 'id' | 'createdAt' | 'updatedAt'>
>;
