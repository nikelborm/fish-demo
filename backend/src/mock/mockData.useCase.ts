import { Injectable } from '@nestjs/common';
import { sub } from 'date-fns';
import { assertMockScriptNameIsCorrect } from 'src/config';
import { repo, UserUseCase } from 'src/modules';
import { AccessScopeType, CreateSensorMeasurementDTO } from 'src/types';

@Injectable()
export class MockDataUseCase {
  constructor(
    private readonly userUseCase: UserUseCase,
    private readonly userToAccessScopeRepo: repo.UserToAccessScopeRepo,
    private readonly accessScopeRepo: repo.AccessScopeRepo,
    private readonly sensorMeasurementRepo: repo.SensorMeasurementRepo,
  ) {}

  async executeMock(scriptName?: string): Promise<void> {
    assertMockScriptNameIsCorrect(scriptName);

    console.log(`\n\n\nFILLING STARTED: ${scriptName}\n`);

    await this[scriptName]();

    console.log('\nDATABASE FILLED SUCCESSFULLY\n\n\n');
  }

  async fillDBScript(): Promise<void> {
    console.log('fillDBScript called');

    const systemAdminScope = await this.accessScopeRepo.createOneWithRelations({
      type: AccessScopeType.SYSTEM_ADMIN,
    });

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

    await this.userToAccessScopeRepo.createOne({
      accessScopeId: systemAdminScope.id,
      userId: user.id,
    });
  }

  async fillSensorMeasurements(): Promise<void> {
    await this.sensorMeasurementRepo.createMany(
      this.#getFakeMeasurements('O2', 0.5, 2),
    );

    await this.sensorMeasurementRepo.createMany(
      this.#getFakeMeasurements('Temp', 20, 40),
    );
  }

  #getFakeMeasurements(
    sensorCodeName: string,
    minValue: number,
    maxValue: number,
  ): Parameters<repo.SensorMeasurementRepo['createMany']>[0] {
    const sinDegrees = (angleDegrees: number): number =>
      Math.sin((angleDegrees * Math.PI) / 180);
    return Array.from({ length: 720 }, (_, i) => i)
      .map(
        (v): CreateSensorMeasurementDTO => ({
          date: sub(new Date(), { seconds: 720 - v + Math.random() * 3 }),
          value:
            minValue +
            0.8 *
              (((sinDegrees(v + Math.random() * 60) + 1) / 2) *
                (maxValue - minValue) +
                ((maxValue - minValue) / 5) * Math.random()) -
            1 +
            Math.random(),
          sensorCodeName,
        }),
      )
      .sort(({ date: a }, { date: b }) => a.getTime() - b.getTime());
  }
}
