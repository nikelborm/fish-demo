import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedEventTable1679043791262 implements MigrationInterface {
    name = 'AddedEventTable1679043791262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "event" (
                "event_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
                "event_type_id" integer NOT NULL,
                "completion_time" TIMESTAMP WITH TIME ZONE NOT NULL,
                "description" character varying NOT NULL,
                "reservoir_id" integer NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_fe0840e4557d98ed53b0ae51466" PRIMARY KEY ("event_id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "event"
            ADD CONSTRAINT "FK_b966ddf4f5772104155218035a6" FOREIGN KEY ("event_type_id") REFERENCES "event_type"("event_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "event" DROP CONSTRAINT "FK_b966ddf4f5772104155218035a6"
        `);
        await queryRunner.query(`
            DROP TABLE "event"
        `);
    }

}
