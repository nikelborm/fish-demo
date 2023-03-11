import type { MigrationInterface, QueryRunner } from 'typeorm';

export class EventType1678498696560 implements MigrationInterface {
  name = 'EventType1678498696560';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "event_type" (
                "event_type_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                "icon" character varying,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_7d0636b1d20667004cc4ebc0edf" UNIQUE ("name"),
                CONSTRAINT "PK_7c35337abf603732db740f5fa4d" PRIMARY KEY ("event_type_id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "event_type"
        `);
  }
}
