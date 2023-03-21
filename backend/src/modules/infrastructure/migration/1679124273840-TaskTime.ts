import { MigrationInterface, QueryRunner } from 'typeorm';

export class TaskTime1679124273840 implements MigrationInterface {
  name = 'TaskTime1679124273840';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "task" (
        "task_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "type" character varying NOT NULL,
        "icon" character varying NOT NULL,
        "description" character varying NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_721f914bb100703f201a77dd58f" PRIMARY KEY ("task_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "task_time" (
        "task_time_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "daytime" character varying NOT NULL,
        "deadline_time" character varying NOT NULL,
        "day_of_week" integer NOT NULL,
        "repeat_type" character varying NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "task_id" integer NOT NULL,
        CONSTRAINT "PK_53781d04b8acf08d2679f7b81b6" PRIMARY KEY ("task_time_id")
      )
    `);
    await queryRunner.query(`
      ALTER TABLE "alert" DROP COLUMN "time"
    `);
    await queryRunner.query(`
      ALTER TABLE "fish_batch" DROP CONSTRAINT "FK_3edef4dfd211f5dd679eaded49d"
    `);
    await queryRunner.query(`
      ALTER TABLE "fish_batch"
      ALTER COLUMN "fish_kind_id"
      SET NOT NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "fish_batch"
      ADD CONSTRAINT "FK_3edef4dfd211f5dd679eaded49d" FOREIGN KEY ("fish_kind_id") REFERENCES "fish_kind"("fish_kind_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "task_time"
      ADD CONSTRAINT "FK_98dd3bc30ccff9f7fa80b087502" FOREIGN KEY ("task_id") REFERENCES "task"("task_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "task_time" DROP CONSTRAINT "FK_98dd3bc30ccff9f7fa80b087502"
    `);
    await queryRunner.query(`
      ALTER TABLE "fish_batch" DROP CONSTRAINT "FK_3edef4dfd211f5dd679eaded49d"
    `);
    await queryRunner.query(`
      ALTER TABLE "fish_batch"
      ALTER COLUMN "fish_kind_id" DROP NOT NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "fish_batch"
      ADD CONSTRAINT "FK_3edef4dfd211f5dd679eaded49d" FOREIGN KEY ("fish_kind_id") REFERENCES "fish_kind"("fish_kind_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "alert"
      ADD "time" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
    `);
    await queryRunner.query(`
      DROP TABLE "task_time"
    `);
    await queryRunner.query(`
      DROP TABLE "task"
    `);
  }
}
