import { MigrationInterface, QueryRunner } from 'typeorm';

export class SensorMeasurements1676933322349 implements MigrationInterface {
  name = 'SensorMeasurements1676933322349';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "sensor_measurement" (
        "sensor_measurement_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "sensor_code_name" character varying(5) NOT NULL,
        "date" TIMESTAMP WITH TIME ZONE NOT NULL,
        "value" character varying NOT NULL,
        CONSTRAINT "PK_d44006835673e3400a97db8a7d8" PRIMARY KEY ("sensor_measurement_id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "sensor_measurement"
    `);
  }
}
