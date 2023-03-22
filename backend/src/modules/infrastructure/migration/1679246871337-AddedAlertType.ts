import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedAlertType1679246871337 implements MigrationInterface {
  name = 'AddedAlertType1679246871337'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "alert_type" (
        "alert_type_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_1d132dad28c8df10d05e3455fa6" PRIMARY KEY ("alert_type_id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "alert_type"
    `);
  }

}
