import { MigrationInterface, QueryRunner } from "typeorm";

export class ConnectAlertAndAlertType1679489079739 implements MigrationInterface {
    name = 'ConnectAlertAndAlertType1679489079739'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "alert_type"
            ADD "description" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "alert"
            ADD CONSTRAINT "FK_4bc746aa927302522c6b8b0594c" FOREIGN KEY ("alert_type_id") REFERENCES "alert_type"("alert_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "alert" DROP CONSTRAINT "FK_4bc746aa927302522c6b8b0594c"
        `);
        await queryRunner.query(`
            ALTER TABLE "alert_type" DROP COLUMN "description"
        `);
    }

}
