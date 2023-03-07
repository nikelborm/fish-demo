import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReservoirAndSensorMeasurementConstraintAndStuff1678156218748
  implements MigrationInterface
{
  name = 'ReservoirAndSensorMeasurementConstraintAndStuff1678156218748';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "reservoir" (
        "reservoir_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "name" character varying NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_e3c90e876e827b8441bf432f77f" PRIMARY KEY ("reservoir_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "sensor_measurement_constraint" (
        "sensor_measurement_constraint_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "sensor_parameter_instance_id" integer NOT NULL,
        "validation_formula" character varying NOT NULL,
        "formula_parameters" jsonb NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_120c15662268c207476dc386266" PRIMARY KEY ("sensor_measurement_constraint_id")
      )
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_measurement" DROP COLUMN "sensor_code_name"
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_measurement" DROP COLUMN "date"
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_instance"
      ADD "reservoir_id" integer NOT NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_measurement"
      ADD "recorded_at_date" TIMESTAMP WITH TIME ZONE NOT NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_measurement"
      ADD "sensor_parameter_instance_id" integer NOT NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_parameter"
      ADD "short_name" character varying NOT NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_parameter"
      ADD CONSTRAINT "UQ_0c856fb9af0ed593b6c2ead2147" UNIQUE ("short_name")
    `);
    await queryRunner.query(`
      CREATE TYPE "public"."sensor_parameter_value_type_name_enum" AS ENUM('number', 'string')
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_parameter"
      ADD "value_type_name" "public"."sensor_parameter_value_type_name_enum" NOT NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_measurement" DROP CONSTRAINT "PK_d44006835673e3400a97db8a7d8"
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_measurement" DROP COLUMN "sensor_measurement_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_measurement"
      ADD "sensor_measurement_id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_measurement"
      ADD CONSTRAINT "PK_d44006835673e3400a97db8a7d8" PRIMARY KEY ("sensor_measurement_id")
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_measurement" DROP COLUMN "value"
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_measurement"
      ADD "value" jsonb NOT NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_parameter"
      ADD CONSTRAINT "UQ_7e3186732cd20fc7295c5de19eb" UNIQUE ("name")
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_instance"
      ADD CONSTRAINT "FK_3b27b139ca736262e5bfaed9029" FOREIGN KEY ("reservoir_id") REFERENCES "reservoir"("reservoir_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_measurement"
      ADD CONSTRAINT "FK_83dabf2a1f478c89da1a158ea19" FOREIGN KEY ("sensor_parameter_instance_id") REFERENCES "sensor_parameter_instance"("sensor_parameter_instance_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_measurement_constraint"
      ADD CONSTRAINT "FK_f87866b4de20111fd7d01198bf5" FOREIGN KEY ("sensor_parameter_instance_id") REFERENCES "sensor_parameter_instance"("sensor_parameter_instance_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "sensor_measurement_constraint" DROP CONSTRAINT "FK_f87866b4de20111fd7d01198bf5"
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_measurement" DROP CONSTRAINT "FK_83dabf2a1f478c89da1a158ea19"
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_instance" DROP CONSTRAINT "FK_3b27b139ca736262e5bfaed9029"
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_parameter" DROP CONSTRAINT "UQ_7e3186732cd20fc7295c5de19eb"
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_measurement" DROP COLUMN "value"
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_measurement"
      ADD "value" numeric NOT NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_measurement" DROP CONSTRAINT "PK_d44006835673e3400a97db8a7d8"
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_measurement" DROP COLUMN "sensor_measurement_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_measurement"
      ADD "sensor_measurement_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_measurement"
      ADD CONSTRAINT "PK_d44006835673e3400a97db8a7d8" PRIMARY KEY ("sensor_measurement_id")
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_parameter" DROP COLUMN "value_type_name"
    `);
    await queryRunner.query(`
      DROP TYPE "public"."sensor_parameter_value_type_name_enum"
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_parameter" DROP CONSTRAINT "UQ_0c856fb9af0ed593b6c2ead2147"
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_parameter" DROP COLUMN "short_name"
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_measurement" DROP COLUMN "sensor_parameter_instance_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_measurement" DROP COLUMN "recorded_at_date"
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_instance" DROP COLUMN "reservoir_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_measurement"
      ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_measurement"
      ADD "sensor_code_name" character varying(5) NOT NULL
    `);
    await queryRunner.query(`
      DROP TABLE "sensor_measurement_constraint"
    `);
    await queryRunner.query(`
      DROP TABLE "reservoir"
    `);
  }
}
