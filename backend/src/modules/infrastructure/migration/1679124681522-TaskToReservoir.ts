import { MigrationInterface, QueryRunner } from 'typeorm';

export class TaskToReservoir1679124681522 implements MigrationInterface {
  name = 'TaskToReservoir1679124681522';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "task_to_reservoir" (
        "task_id" integer NOT NULL,
        "reservoir_id" integer NOT NULL,
        "user_id" integer NOT NULL,
        CONSTRAINT "PK_c34bde5c0e81f8af7a5c9210581" PRIMARY KEY ("task_id", "reservoir_id")
      )
    `);
    await queryRunner.query(`
      ALTER TABLE "task_to_reservoir"
      ADD CONSTRAINT "FK_8c2fd3a230b4650c77679ee824c" FOREIGN KEY ("task_id") REFERENCES "task"("task_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "task_to_reservoir"
      ADD CONSTRAINT "FK_a98e5e32c44544c6063746b48b6" FOREIGN KEY ("reservoir_id") REFERENCES "reservoir"("reservoir_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "task_to_reservoir"
      ADD CONSTRAINT "FK_bd9cf7e470f05e0887418c5ef1b" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "task_to_reservoir" DROP CONSTRAINT "FK_bd9cf7e470f05e0887418c5ef1b"
    `);
    await queryRunner.query(`
      ALTER TABLE "task_to_reservoir" DROP CONSTRAINT "FK_a98e5e32c44544c6063746b48b6"
    `);
    await queryRunner.query(`
      ALTER TABLE "task_to_reservoir" DROP CONSTRAINT "FK_8c2fd3a230b4650c77679ee824c"
    `);
    await queryRunner.query(`
      DROP TABLE "task_to_reservoir"
    `);
  }
}
