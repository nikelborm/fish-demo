import { MigrationInterface, QueryRunner } from 'typeorm';

export class Fix1680255373375 implements MigrationInterface {
  name = 'Fix1680255373375';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "fish_info" (
        "fish_info_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "name" character varying NOT NULL,
        "behavior_id" integer NOT NULL,
        "description" character varying NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_5a2fbf8fad22b18517b7e1b2066" UNIQUE ("name"),
        CONSTRAINT "PK_6aec3ad8e90d732196aed0d3aba" PRIMARY KEY ("fish_info_id")
      )
    `);
    await queryRunner.query(`
      ALTER TABLE "behavior_type"
      ADD "fish_info_id" integer
    `);
    await queryRunner.query(`
      ALTER TABLE "behavior_type"
      ADD CONSTRAINT "UQ_b83372356f7ddd656ca1c9a77da" UNIQUE ("fish_info_id")
    `);
    await queryRunner.query(`
      ALTER TABLE "behavior"
      ADD "reservoir_id" integer NOT NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "behavior_type"
      ADD CONSTRAINT "FK_b83372356f7ddd656ca1c9a77da" FOREIGN KEY ("fish_info_id") REFERENCES "fish_info"("fish_info_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "alert"
      ADD CONSTRAINT "FK_cdc39617ab1e8c537e751065406" FOREIGN KEY ("reservoir_id") REFERENCES "reservoir"("reservoir_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "behavior"
      ADD CONSTRAINT "FK_c0699bc994cb0d2e6c386e49400" FOREIGN KEY ("reservoir_id") REFERENCES "reservoir"("reservoir_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "behavior" DROP CONSTRAINT "FK_c0699bc994cb0d2e6c386e49400"
    `);
    await queryRunner.query(`
      ALTER TABLE "alert" DROP CONSTRAINT "FK_cdc39617ab1e8c537e751065406"
    `);
    await queryRunner.query(`
      ALTER TABLE "behavior_type" DROP CONSTRAINT "FK_b83372356f7ddd656ca1c9a77da"
    `);
    await queryRunner.query(`
      ALTER TABLE "behavior" DROP COLUMN "reservoir_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "behavior_type" DROP CONSTRAINT "UQ_b83372356f7ddd656ca1c9a77da"
    `);
    await queryRunner.query(`
      ALTER TABLE "behavior_type" DROP COLUMN "fish_info_id"
    `);
    await queryRunner.query(`
      DROP TABLE "fish_info"
    `);
  }
}
