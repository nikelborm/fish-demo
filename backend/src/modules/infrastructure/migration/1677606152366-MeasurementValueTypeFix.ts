import { MigrationInterface, QueryRunner } from "typeorm";

export class MeasurementValueTypeFix1677606152366 implements MigrationInterface {
    name = 'MeasurementValueTypeFix1677606152366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "sensor_measurement" DROP COLUMN "value"
        `);
        await queryRunner.query(`
            ALTER TABLE "sensor_measurement"
            ADD "value" numeric NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "sensor_measurement" DROP COLUMN "value"
        `);
        await queryRunner.query(`
            ALTER TABLE "sensor_measurement"
            ADD "value" character varying NOT NULL
        `);
    }

}
