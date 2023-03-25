import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReservoirConnectFishBatch1679682413072
  implements MigrationInterface
{
  name = 'ReservoirConnectFishBatch1679682413072';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "reservoir"
                RENAME COLUMN "fish_part_id" TO "fish_batch_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "reservoir"
            ADD CONSTRAINT "FK_67270689b2cd8a0f416addd1e43" FOREIGN KEY ("fish_batch_id") REFERENCES "fish_batch"("fish_batch_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "reservoir" DROP CONSTRAINT "FK_67270689b2cd8a0f416addd1e43"
        `);

        await queryRunner.query(`
            ALTER TABLE "reservoir"
                RENAME COLUMN "fish_batch_id" TO "fish_part_id"
        `);
  }
}
