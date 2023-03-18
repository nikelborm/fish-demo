import { MigrationInterface, QueryRunner } from 'typeorm';

export class BehaviorFixes1679126604809 implements MigrationInterface {
  name = 'BehaviorFixes1679126604809';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "behavior"
      ADD "probability" integer NOT NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "behavior"
      ADD "time" TIMESTAMP WITH TIME ZONE NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "behavior" DROP COLUMN "time"
    `);
    await queryRunner.query(`
      ALTER TABLE "behavior" DROP COLUMN "probability"
    `);
  }
}
