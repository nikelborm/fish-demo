import type { MigrationInterface, QueryRunner } from 'typeorm';

export class NeuroTables1677562804186 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS cameras(
          cam_id serial,
          cam_name varchar(32) UNIQUE,
          PRIMARY KEY (cam_id)
      );
    `);
    await queryRunner.query(`
CREATE TABLE IF NOT EXISTS videos
(
    vid_id serial,
    cam_id integer,
    vid_beg timestamp with time zone UNIQUE,
    vid_end timestamp with time zone UNIQUE,
    PRIMARY KEY(vid_id),
    FOREIGN KEY (cam_id) REFERENCES cameras (cam_id) ON DELETE CASCADE
);
`);
    await queryRunner.query(`
CREATE TABLE IF NOT EXISTS labels
(
    lbl_id serial,
    lbl_name varchar(32) UNIQUE,
    PRIMARY KEY(lbl_id)
);
`);
    await queryRunner.query(`
CREATE TABLE IF NOT EXISTS video_labels
(
    vid_id integer,
    lbl_id integer,
    PRIMARY KEY(vid_id),
    FOREIGN KEY (vid_id) REFERENCES videos (vid_id) ON DELETE CASCADE,
    FOREIGN KEY (lbl_id) REFERENCES labels (lbl_id) ON DELETE CASCADE
);
`);
    await queryRunner.query(`
CREATE TABLE IF NOT EXISTS tags
(
    tag_id serial,
    tag_name varchar(32) UNIQUE,
    PRIMARY KEY(tag_id)
);
`);
    await queryRunner.query(`
CREATE TABLE IF NOT EXISTS video_tags
(
    vid_id integer,
    tag_id integer,
    tag_meta json,
    PRIMARY KEY(vid_id, tag_id),
    FOREIGN KEY (vid_id) REFERENCES videos (vid_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags (tag_id) ON DELETE CASCADE
);
`);
    await queryRunner.query(`
CREATE TABLE IF NOT EXISTS models
(
    mdl_id serial,
    mdl_name varchar(32),
    mdl_version integer,
    PRIMARY KEY(mdl_id),
    UNIQUE (mdl_name, mdl_version)
);
`);
    await queryRunner.query(`
CREATE TABLE IF NOT EXISTS model_tests
(
    test_id serial,
    mdl_id integer,
    test_time timestamp with time zone UNIQUE,
    test_metrics json,
    PRIMARY KEY (test_id),
    FOREIGN KEY (mdl_id) REFERENCES models (mdl_id) ON DELETE CASCADE
);
`);
    await queryRunner.query(`
CREATE TABLE IF NOT EXISTS pred_labels
(
    pred_id serial,
    vid_id integer,
    lbl_id integer,
    mdl_id integer,
    pred_prob real NOT NULL,
    PRIMARY KEY (pred_id),
    UNIQUE (vid_id, lbl_id, mdl_id),
    FOREIGN KEY (vid_id) REFERENCES videos (vid_id) ON DELETE CASCADE,
    FOREIGN KEY (lbl_id) REFERENCES labels (lbl_id) ON DELETE CASCADE,
    FOREIGN KEY (mdl_id) REFERENCES models (mdl_id) ON DELETE CASCADE
);
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "pred_labels";`);
    await queryRunner.query(`DROP TABLE "model_tests";`);
    await queryRunner.query(`DROP TABLE "models";`);
    await queryRunner.query(`DROP TABLE "video_tags";`);
    await queryRunner.query(`DROP TABLE "tags ";`);
    await queryRunner.query(`DROP TABLE "video_labels";`);
    await queryRunner.query(`DROP TABLE "labels";`);
    await queryRunner.query(`DROP TABLE "videos";`);
    await queryRunner.query(`DROP TABLE "cameras";`);
  }
}
