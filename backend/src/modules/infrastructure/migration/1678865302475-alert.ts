import { MigrationInterface, QueryRunner } from "typeorm";

export class alert1678865302475 implements MigrationInterface {
  name = 'alert1678865302475'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "alert" (
        "alert_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "reservoir_id" integer NOT NULL,
        "alert_type_id" integer NOT NULL,
        "time" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "importance" real NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_d0e17781721feccfef5c750a41e" PRIMARY KEY ("alert_id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "alert"
    `);
  }

}
