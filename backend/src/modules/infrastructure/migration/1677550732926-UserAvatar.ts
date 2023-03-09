import type { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAvatar1677550732926 implements MigrationInterface {
  name = 'UserAvatar1677550732926';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user"
      ADD "nickname" character varying NOT NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "user"
      ADD "avatar_url" character varying
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user" DROP COLUMN "avatar_url"
    `);
    await queryRunner.query(`
      ALTER TABLE "user" DROP COLUMN "nickname"
    `);
  }
}
