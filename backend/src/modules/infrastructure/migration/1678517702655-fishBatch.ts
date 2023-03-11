import type { MigrationInterface, QueryRunner } from 'typeorm';

export class fishBatch1678517702655 implements MigrationInterface {
  name = 'fishBatch1678517702655';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "fish_batch" (
                "fish_batch_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
                "name" character varying NOT NULL,
                "fish_kind_id" integer NOT NULL,
                "age" integer NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_b879bd26f94d412da454e9e991d" PRIMARY KEY ("fish_batch_id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "fish_batch"
        `);
  }
}
