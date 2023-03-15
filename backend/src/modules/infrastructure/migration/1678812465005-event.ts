import { MigrationInterface, QueryRunner } from "typeorm";

export class event1678812465005 implements MigrationInterface {
    name = 'event1678812465005'

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
        await queryRunner.query(`
            CREATE TABLE "event" (
                "event_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_fe0840e4557d98ed53b0ae51466" PRIMARY KEY ("event_id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "event"
        `);
        await queryRunner.query(`
            DROP TABLE "behavior_type"
        `);
    }

}
