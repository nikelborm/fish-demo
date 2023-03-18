import { MigrationInterface, QueryRunner } from "typeorm";

export class FishKindConnectFishBatch1678823761563 implements MigrationInterface {
    name = 'FishKindConnectFishBatch1678823761563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "fish_batch"
            ALTER COLUMN "fish_kind_id" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "fish_batch"
            ADD CONSTRAINT "FK_3edef4dfd211f5dd679eaded49d" FOREIGN KEY ("fish_kind_id") REFERENCES "fish_kind"("fish_kind_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "fish_batch" DROP CONSTRAINT "FK_3edef4dfd211f5dd679eaded49d"
        `);
        await queryRunner.query(`
            ALTER TABLE "fish_batch"
            ALTER COLUMN "fish_kind_id"
            SET NOT NULL
        `);
    }

}
