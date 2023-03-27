import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedFishInfo1679906322168 implements MigrationInterface {
  name = 'AddedFishInfo1679906322168';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "abstract_sensor_to_sensor_instance" (
        "abstract_sensor_id" integer NOT NULL,
        "sensor_instance_id" integer NOT NULL,
        CONSTRAINT "UQ_ac8c94b2a47fa0a6966225e2710" UNIQUE ("sensor_instance_id"),
        CONSTRAINT "PK_8e39c9e40abbe44479e8138fc49" PRIMARY KEY ("abstract_sensor_id", "sensor_instance_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "abstract_sensor_to_sensor_parameter" (
        "abstract_sensor_id" integer NOT NULL,
        "sensor_parameter_id" integer NOT NULL,
        CONSTRAINT "PK_9ddc9e8c10c956cc0a2314a40ce" PRIMARY KEY ("abstract_sensor_id", "sensor_parameter_id")
      )
    `);
    await queryRunner.query(`
      CREATE TYPE "public"."access_scope_type_enum" AS ENUM('superAdmin', 'admin')
    `);
    await queryRunner.query(`
      CREATE TABLE "access_scope" (
        "access_scope_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "type" "public"."access_scope_type_enum" NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_26acb7cf35e5f4a08a85d937b6e" PRIMARY KEY ("access_scope_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "reservoir" (
        "reservoir_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "name" character varying NOT NULL,
        "fish_count" integer NOT NULL,
        "fish_batch_id" integer NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_e3c90e876e827b8441bf432f77f" PRIMARY KEY ("reservoir_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "sensor_instance" (
        "sensor_instance_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "reservoir_id" integer NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_7bdc89107af7296eb8a36456b59" PRIMARY KEY ("sensor_instance_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "sensor_parameter_instance" (
        "sensor_parameter_instance_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "sensor_instance_id" integer NOT NULL,
        "abstract_sensor_id" integer NOT NULL,
        "sensor_parameter_id" integer NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_sensor_parameter_instance_keys" UNIQUE ("sensor_parameter_id", "sensor_instance_id"),
        CONSTRAINT "PK_2d5bb068fccb5278cf133c6a1ba" PRIMARY KEY ("sensor_parameter_instance_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "sensor_measurement" (
        "sensor_measurement_id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
        "recorded_at_date" TIMESTAMP WITH TIME ZONE NOT NULL,
        "value" jsonb NOT NULL,
        "sensor_parameter_instance_id" integer NOT NULL,
        CONSTRAINT "PK_d44006835673e3400a97db8a7d8" PRIMARY KEY ("sensor_measurement_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "sensor_measurement_constraint" (
        "sensor_measurement_constraint_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "sensor_parameter_instance_id" integer NOT NULL,
        "validation_formula" character varying NOT NULL,
        "formula_parameters" jsonb NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_120c15662268c207476dc386266" PRIMARY KEY ("sensor_measurement_constraint_id")
      )
    `);
    await queryRunner.query(`
      CREATE TYPE "public"."sensor_parameter_value_type_name_enum" AS ENUM('number', 'string')
    `);
    await queryRunner.query(`
      CREATE TABLE "sensor_parameter" (
        "sensor_parameter_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "unit" character varying NOT NULL,
        "name" character varying NOT NULL,
        "short_name" character varying NOT NULL,
        "value_type_name" "public"."sensor_parameter_value_type_name_enum" NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_7e3186732cd20fc7295c5de19eb" UNIQUE ("name"),
        CONSTRAINT "UQ_0c856fb9af0ed593b6c2ead2147" UNIQUE ("short_name"),
        CONSTRAINT "PK_1bfeb551793a72d75581a38aedf" PRIMARY KEY ("sensor_parameter_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "user" (
        "user_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "first_name" character varying NOT NULL,
        "last_name" character varying NOT NULL,
        "nickname" character varying NOT NULL,
        "email" character varying NOT NULL,
        "salt" character varying NOT NULL,
        "password_hash" character varying NOT NULL,
        "avatar_url" character varying,
        "patronymic" character varying NOT NULL,
        "gender" character varying NOT NULL,
        "phone" character varying(15),
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
        CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "user_to_access_scope" (
        "user_id" integer NOT NULL,
        "access_scope_id" integer NOT NULL,
        CONSTRAINT "PK_f6326c8d048b48d6cc64b8e2e64" PRIMARY KEY ("user_id", "access_scope_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "fish_batch" (
        "fish_batch_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "name" character varying NOT NULL,
        "fish_kind_id" integer NOT NULL,
        "age" integer NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_b879bd26f94d412da454e9e991d" PRIMARY KEY ("fish_batch_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "fish_kind" (
        "fish_kind_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "name" character varying NOT NULL,
        "description" character varying NOT NULL,
        "icon" character varying,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_5294b919a2743fddc4625d3a5b3" UNIQUE ("name"),
        CONSTRAINT "PK_3c6a43333095b75dea26b10d677" PRIMARY KEY ("fish_kind_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "event_type" (
        "event_type_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "name" character varying NOT NULL,
        "description" character varying NOT NULL,
        "icon" character varying,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_7d0636b1d20667004cc4ebc0edf" UNIQUE ("name"),
        CONSTRAINT "PK_7c35337abf603732db740f5fa4d" PRIMARY KEY ("event_type_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "behavior_type" (
        "behavior_type_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "name" character varying NOT NULL,
        "description" character varying NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_88be9160d7904db7655739e4e15" UNIQUE ("name"),
        CONSTRAINT "PK_f9de7f254100dd8f791039d9496" PRIMARY KEY ("behavior_type_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "event" (
        "event_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "event_type_id" integer NOT NULL,
        "completion_time" TIMESTAMP WITH TIME ZONE NOT NULL,
        "description" character varying NOT NULL,
        "reservoir_id" integer NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_fe0840e4557d98ed53b0ae51466" PRIMARY KEY ("event_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "alert_type" (
        "alert_type_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "description" character varying NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_1d132dad28c8df10d05e3455fa6" PRIMARY KEY ("alert_type_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "alert" (
        "alert_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "reservoir_id" integer NOT NULL,
        "alert_type_id" integer NOT NULL,
        "importance" real NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_d0e17781721feccfef5c750a41e" PRIMARY KEY ("alert_id")
      )
    `);
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
      CREATE TABLE "task_to_reservoir" (
        "task_id" integer NOT NULL,
        "reservoir_id" integer NOT NULL,
        "user_id" integer NOT NULL,
        CONSTRAINT "PK_c34bde5c0e81f8af7a5c9210581" PRIMARY KEY ("task_id", "reservoir_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "behavior" (
        "behavior_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "probability" integer NOT NULL,
        "time" TIMESTAMP WITH TIME ZONE NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "behavior_type_id" integer NOT NULL,
        "reservoir_id" integer NOT NULL,
        CONSTRAINT "PK_e78a9eab36e2d5967b71e14f2e0" PRIMARY KEY ("behavior_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "fish_info" (
        "fish_info_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "name" character varying NOT NULL,
        "reservoir_id" integer NOT NULL,
        "description" character varying NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_5a2fbf8fad22b18517b7e1b2066" UNIQUE ("name"),
        CONSTRAINT "PK_6aec3ad8e90d732196aed0d3aba" PRIMARY KEY ("fish_info_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "abstract_sensor" (
        "abstract_sensor_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
        "model_name" character varying NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_1a44074dac38fd7abd39ac3cfd5" UNIQUE ("model_name"),
        CONSTRAINT "PK_421bb2b8ac343f397a9d3243f98" PRIMARY KEY ("abstract_sensor_id")
      )
    `);
    await queryRunner.query(`
      ALTER TABLE "abstract_sensor_to_sensor_instance"
      ADD CONSTRAINT "FK_527e0931a26d49e6a3f47166420" FOREIGN KEY ("abstract_sensor_id") REFERENCES "abstract_sensor"("abstract_sensor_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "abstract_sensor_to_sensor_instance"
      ADD CONSTRAINT "FK_ac8c94b2a47fa0a6966225e2710" FOREIGN KEY ("sensor_instance_id") REFERENCES "sensor_instance"("sensor_instance_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "abstract_sensor_to_sensor_parameter"
      ADD CONSTRAINT "FK_55e286e5e0d4d861c4131bb5db9" FOREIGN KEY ("abstract_sensor_id") REFERENCES "abstract_sensor"("abstract_sensor_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "abstract_sensor_to_sensor_parameter"
      ADD CONSTRAINT "FK_24173dfb222acf8a0230acf58ba" FOREIGN KEY ("sensor_parameter_id") REFERENCES "sensor_parameter"("sensor_parameter_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "reservoir"
      ADD CONSTRAINT "FK_67270689b2cd8a0f416addd1e43" FOREIGN KEY ("fish_batch_id") REFERENCES "fish_batch"("fish_batch_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_instance"
      ADD CONSTRAINT "FK_3b27b139ca736262e5bfaed9029" FOREIGN KEY ("reservoir_id") REFERENCES "reservoir"("reservoir_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_parameter_instance"
      ADD CONSTRAINT "FK_d0ef3d217d5ed28762ce8c0534d" FOREIGN KEY ("abstract_sensor_id", "sensor_parameter_id") REFERENCES "abstract_sensor_to_sensor_parameter"("abstract_sensor_id", "sensor_parameter_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_parameter_instance"
      ADD CONSTRAINT "FK_f54f1241f7c1175d71b69cca73e" FOREIGN KEY ("abstract_sensor_id", "sensor_instance_id") REFERENCES "abstract_sensor_to_sensor_instance"("abstract_sensor_id", "sensor_instance_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_measurement"
      ADD CONSTRAINT "FK_83dabf2a1f478c89da1a158ea19" FOREIGN KEY ("sensor_parameter_instance_id") REFERENCES "sensor_parameter_instance"("sensor_parameter_instance_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_measurement_constraint"
      ADD CONSTRAINT "FK_f87866b4de20111fd7d01198bf5" FOREIGN KEY ("sensor_parameter_instance_id") REFERENCES "sensor_parameter_instance"("sensor_parameter_instance_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "user_to_access_scope"
      ADD CONSTRAINT "FK_e507f0edbfbe11f2552fe977fc3" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "user_to_access_scope"
      ADD CONSTRAINT "FK_25a021e06c12cff03ca94149649" FOREIGN KEY ("access_scope_id") REFERENCES "access_scope"("access_scope_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "fish_batch"
      ADD CONSTRAINT "FK_3edef4dfd211f5dd679eaded49d" FOREIGN KEY ("fish_kind_id") REFERENCES "fish_kind"("fish_kind_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "event"
      ADD CONSTRAINT "FK_b966ddf4f5772104155218035a6" FOREIGN KEY ("event_type_id") REFERENCES "event_type"("event_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "event"
      ADD CONSTRAINT "FK_329485394298a6fc4bd0eaaa497" FOREIGN KEY ("reservoir_id") REFERENCES "reservoir"("reservoir_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "alert"
      ADD CONSTRAINT "FK_4bc746aa927302522c6b8b0594c" FOREIGN KEY ("alert_type_id") REFERENCES "alert_type"("alert_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "alert"
      ADD CONSTRAINT "FK_cdc39617ab1e8c537e751065406" FOREIGN KEY ("reservoir_id") REFERENCES "reservoir"("reservoir_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "task_time"
      ADD CONSTRAINT "FK_98dd3bc30ccff9f7fa80b087502" FOREIGN KEY ("task_id") REFERENCES "task"("task_id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
    await queryRunner.query(`
      ALTER TABLE "behavior"
      ADD CONSTRAINT "FK_6c36da68e6b4e2fc40bf76999b4" FOREIGN KEY ("behavior_type_id") REFERENCES "behavior_type"("behavior_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "behavior"
      ADD CONSTRAINT "FK_c0699bc994cb0d2e6c386e49400" FOREIGN KEY ("reservoir_id") REFERENCES "reservoir"("reservoir_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "behavior" DROP CONSTRAINT "FK_c0699bc994cb0d2e6c386e49400"
    `);
    await queryRunner.query(`
      ALTER TABLE "behavior" DROP CONSTRAINT "FK_6c36da68e6b4e2fc40bf76999b4"
    `);
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
      ALTER TABLE "task_time" DROP CONSTRAINT "FK_98dd3bc30ccff9f7fa80b087502"
    `);
    await queryRunner.query(`
      ALTER TABLE "alert" DROP CONSTRAINT "FK_cdc39617ab1e8c537e751065406"
    `);
    await queryRunner.query(`
      ALTER TABLE "alert" DROP CONSTRAINT "FK_4bc746aa927302522c6b8b0594c"
    `);
    await queryRunner.query(`
      ALTER TABLE "event" DROP CONSTRAINT "FK_329485394298a6fc4bd0eaaa497"
    `);
    await queryRunner.query(`
      ALTER TABLE "event" DROP CONSTRAINT "FK_b966ddf4f5772104155218035a6"
    `);
    await queryRunner.query(`
      ALTER TABLE "fish_batch" DROP CONSTRAINT "FK_3edef4dfd211f5dd679eaded49d"
    `);
    await queryRunner.query(`
      ALTER TABLE "user_to_access_scope" DROP CONSTRAINT "FK_25a021e06c12cff03ca94149649"
    `);
    await queryRunner.query(`
      ALTER TABLE "user_to_access_scope" DROP CONSTRAINT "FK_e507f0edbfbe11f2552fe977fc3"
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_measurement_constraint" DROP CONSTRAINT "FK_f87866b4de20111fd7d01198bf5"
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_measurement" DROP CONSTRAINT "FK_83dabf2a1f478c89da1a158ea19"
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_parameter_instance" DROP CONSTRAINT "FK_f54f1241f7c1175d71b69cca73e"
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_parameter_instance" DROP CONSTRAINT "FK_d0ef3d217d5ed28762ce8c0534d"
    `);
    await queryRunner.query(`
      ALTER TABLE "sensor_instance" DROP CONSTRAINT "FK_3b27b139ca736262e5bfaed9029"
    `);
    await queryRunner.query(`
      ALTER TABLE "reservoir" DROP CONSTRAINT "FK_67270689b2cd8a0f416addd1e43"
    `);
    await queryRunner.query(`
      ALTER TABLE "abstract_sensor_to_sensor_parameter" DROP CONSTRAINT "FK_24173dfb222acf8a0230acf58ba"
    `);
    await queryRunner.query(`
      ALTER TABLE "abstract_sensor_to_sensor_parameter" DROP CONSTRAINT "FK_55e286e5e0d4d861c4131bb5db9"
    `);
    await queryRunner.query(`
      ALTER TABLE "abstract_sensor_to_sensor_instance" DROP CONSTRAINT "FK_ac8c94b2a47fa0a6966225e2710"
    `);
    await queryRunner.query(`
      ALTER TABLE "abstract_sensor_to_sensor_instance" DROP CONSTRAINT "FK_527e0931a26d49e6a3f47166420"
    `);
    await queryRunner.query(`
      DROP TABLE "abstract_sensor"
    `);
    await queryRunner.query(`
      DROP TABLE "fish_info"
    `);
    await queryRunner.query(`
      DROP TABLE "behavior"
    `);
    await queryRunner.query(`
      DROP TABLE "task_to_reservoir"
    `);
    await queryRunner.query(`
      DROP TABLE "task_time"
    `);
    await queryRunner.query(`
      DROP TABLE "task"
    `);
    await queryRunner.query(`
      DROP TABLE "alert"
    `);
    await queryRunner.query(`
      DROP TABLE "alert_type"
    `);
    await queryRunner.query(`
      DROP TABLE "event"
    `);
    await queryRunner.query(`
      DROP TABLE "behavior_type"
    `);
    await queryRunner.query(`
      DROP TABLE "event_type"
    `);
    await queryRunner.query(`
      DROP TABLE "fish_kind"
    `);
    await queryRunner.query(`
      DROP TABLE "fish_batch"
    `);
    await queryRunner.query(`
      DROP TABLE "user_to_access_scope"
    `);
    await queryRunner.query(`
      DROP TABLE "user"
    `);
    await queryRunner.query(`
      DROP TABLE "sensor_parameter"
    `);
    await queryRunner.query(`
      DROP TYPE "public"."sensor_parameter_value_type_name_enum"
    `);
    await queryRunner.query(`
      DROP TABLE "sensor_measurement_constraint"
    `);
    await queryRunner.query(`
      DROP TABLE "sensor_measurement"
    `);
    await queryRunner.query(`
      DROP TABLE "sensor_parameter_instance"
    `);
    await queryRunner.query(`
      DROP TABLE "sensor_instance"
    `);
    await queryRunner.query(`
      DROP TABLE "reservoir"
    `);
    await queryRunner.query(`
      DROP TABLE "access_scope"
    `);
    await queryRunner.query(`
      DROP TYPE "public"."access_scope_type_enum"
    `);
    await queryRunner.query(`
      DROP TABLE "abstract_sensor_to_sensor_parameter"
    `);
    await queryRunner.query(`
      DROP TABLE "abstract_sensor_to_sensor_instance"
    `);
  }
}
