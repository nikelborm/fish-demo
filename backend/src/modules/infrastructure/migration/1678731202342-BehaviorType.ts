import type { MigrationInterface, QueryRunner } from 'typeorm';

export class BehaviorType1678731202342 implements MigrationInterface {
  name = 'BehaviorType1678731202342';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "behavior_type" (
                "behavior_type_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_88be9160d7904db7655739e4e15" UNIQUE ("name"),
                CONSTRAINT "PK_f9de7f254100dd8f791039d9496" PRIMARY KEY ("behavior_type_id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "behavior_type"
        `);
  }
}
