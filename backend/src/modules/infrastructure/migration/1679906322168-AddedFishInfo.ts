import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedFishInfo1679906322168 implements MigrationInterface {
  name = 'AddedFishInfo1679906322168';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "fish_info" (
        "fish_info_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "name" character varying NOT NULL,
        "reservoir_id" integer NOT NULL,
        "description" character varying NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_5a2fbf8fad22b18517b7e1b2066" UNIQUE ("name"),
        CONSTRAINT "PK_6aec3ad8e90d732196aed0d3aba" PRIMARY KEY ("fish_info_id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "fish_info"
    `);
  }
}
