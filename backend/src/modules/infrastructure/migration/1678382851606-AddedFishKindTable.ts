import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedFishKindTable1678382851606 implements MigrationInterface {
  name = 'AddedFishKindTable1678382851606';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "fish_kind" (
        "fish_kind_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "name" character varying NOT NULL,
        "description" character varying NOT NULL,
        "icon" character varying,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_5294b919a2743fddc4625d3a5b3" UNIQUE ("name"),
        CONSTRAINT "PK_3c6a43333095b75dea26b10d677" PRIMARY KEY ("fish_kind_id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "fish_kind"
    `);
  }
}
