import { MigrationInterface, QueryRunner } from 'typeorm';

export class SensorsAndStuff1677998500311 implements MigrationInterface {
  name = 'SensorsAndStuff1677998500311';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "abstract_sensor" (
        "abstract_sensor_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "model_name" character varying NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_1a44074dac38fd7abd39ac3cfd5" UNIQUE ("model_name"),
        CONSTRAINT "PK_421bb2b8ac343f397a9d3243f98" PRIMARY KEY ("abstract_sensor_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "abstract_sensor_to_sensor_instance" (
        "abstract_sensor_id" integer NOT NULL,
        "sensor_instance_id" integer NOT NULL,
        CONSTRAINT "UQ_ac8c94b2a47fa0a6966225e2710" UNIQUE ("sensor_instance_id"),
        CONSTRAINT "PK_8e39c9e40abbe44479e8138fc49" PRIMARY KEY ("abstract_sensor_id", "sensor_instance_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "sensor_instance" (
        "sensor_instance_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_7bdc89107af7296eb8a36456b59" PRIMARY KEY ("sensor_instance_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "sensor_parameter" (
        "sensor_parameter_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "unit" character varying NOT NULL,
        "name" character varying NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_1bfeb551793a72d75581a38aedf" PRIMARY KEY ("sensor_parameter_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "sensor_parameter_instance" (
        "sensor_parameter_instance_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "abstract_sensor_id" integer NOT NULL,
        "sensor_parameter_id" integer NOT NULL,
        "sensor_instance_id" integer NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_sensor_parameter_instance_keys" UNIQUE ("sensor_parameter_id", "sensor_instance_id"),
        CONSTRAINT "PK_2d5bb068fccb5278cf133c6a1ba" PRIMARY KEY ("sensor_parameter_instance_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "abstract_sensor_to_sensor_parameter" (
        "abstract_sensor_id" integer NOT NULL,
        "sensor_parameter_id" integer NOT NULL,
        CONSTRAINT "PK_9ddc9e8c10c956cc0a2314a40ce" PRIMARY KEY ("abstract_sensor_id", "sensor_parameter_id")
      )
    `);
    await queryRunner.query(`
      ALTER TABLE "abstract_sensor_to_sensor_instance"
      ADD CONSTRAINT "FK_527e0931a26d49e6a3f47166420" FOREIGN KEY ("abstract_sensor_id") REFERENCES "abstract_sensor"("abstract_sensor_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "abstract_sensor_to_sensor_instance"
      ADD CONSTRAINT "FK_ac8c94b2a47fa0a6966225e2710" FOREIGN KEY ("sensor_instance_id") REFERENCES "sensor_instance"("sensor_instance_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_parameter_instance"
      ADD CONSTRAINT "FK_d0ef3d217d5ed28762ce8c0534d" FOREIGN KEY ("abstract_sensor_id", "sensor_parameter_id") REFERENCES "abstract_sensor_to_sensor_parameter"("abstract_sensor_id", "sensor_parameter_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_parameter_instance"
      ADD CONSTRAINT "FK_f54f1241f7c1175d71b69cca73e" FOREIGN KEY ("abstract_sensor_id", "sensor_instance_id") REFERENCES "abstract_sensor_to_sensor_instance"("abstract_sensor_id", "sensor_instance_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "abstract_sensor_to_sensor_parameter"
      ADD CONSTRAINT "FK_55e286e5e0d4d861c4131bb5db9" FOREIGN KEY ("abstract_sensor_id") REFERENCES "abstract_sensor"("abstract_sensor_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "abstract_sensor_to_sensor_parameter"
      ADD CONSTRAINT "FK_24173dfb222acf8a0230acf58ba" FOREIGN KEY ("sensor_parameter_id") REFERENCES "sensor_parameter"("sensor_parameter_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "abstract_sensor_to_sensor_parameter" DROP CONSTRAINT "FK_24173dfb222acf8a0230acf58ba"
    `);
    await queryRunner.query(`
      ALTER TABLE "abstract_sensor_to_sensor_parameter" DROP CONSTRAINT "FK_55e286e5e0d4d861c4131bb5db9"
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_parameter_instance" DROP CONSTRAINT "FK_f54f1241f7c1175d71b69cca73e"
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_parameter_instance" DROP CONSTRAINT "FK_d0ef3d217d5ed28762ce8c0534d"
    `);
    await queryRunner.query(`
      ALTER TABLE "abstract_sensor_to_sensor_instance" DROP CONSTRAINT "FK_ac8c94b2a47fa0a6966225e2710"
    `);
    await queryRunner.query(`
      ALTER TABLE "abstract_sensor_to_sensor_instance" DROP CONSTRAINT "FK_527e0931a26d49e6a3f47166420"
    `);
    await queryRunner.query(`
      DROP TABLE "abstract_sensor_to_sensor_parameter"
    `);
    await queryRunner.query(`
      DROP TABLE "sensor_parameter_instance"
    `);
    await queryRunner.query(`
      DROP TABLE "sensor_parameter"
    `);
    await queryRunner.query(`
      DROP TABLE "sensor_instance"
    `);
    await queryRunner.query(`
      DROP TABLE "abstract_sensor_to_sensor_instance"
    `);
    await queryRunner.query(`
      DROP TABLE "abstract_sensor"
    `);
  }
}
