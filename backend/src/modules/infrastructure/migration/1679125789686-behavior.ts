import { MigrationInterface, QueryRunner } from 'typeorm';

export class behavior1679125789686 implements MigrationInterface {
  name = 'behavior1679125789686';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "behavior" (
        "behavior_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "behavior_type_id" integer NOT NULL,
        CONSTRAINT "PK_e78a9eab36e2d5967b71e14f2e0" PRIMARY KEY ("behavior_id")
      )
    `);
    await queryRunner.query(`
      ALTER TABLE "behavior"
      ADD CONSTRAINT "FK_6c36da68e6b4e2fc40bf76999b4" FOREIGN KEY ("behavior_type_id") REFERENCES "behavior_type"("behavior_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "behavior" DROP CONSTRAINT "FK_6c36da68e6b4e2fc40bf76999b4"
    `);
    await queryRunner.query(`
      DROP TABLE "behavior"
    `);
  }
}
