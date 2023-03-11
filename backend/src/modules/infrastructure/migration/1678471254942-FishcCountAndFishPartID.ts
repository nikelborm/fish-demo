import type { MigrationInterface, QueryRunner } from 'typeorm';

export class FishCountAndFishPartID1678471254942 implements MigrationInterface {
  name = 'FishCountAndFishPartID1678471254942';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "reservoir"
            ADD "fish_count" integer NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "reservoir"
            ADD "fish_part_id" integer NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "reservoir" DROP COLUMN "fish_part_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "reservoir" DROP COLUMN "fish_count"
        `);
  }
}
