import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUserEntity1760465433247 implements MigrationInterface {
  name = 'AddUserEntity1760465433247'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" int NOT NULL IDENTITY(1,1), "cUsername" nvarchar(255) NOT NULL, "cPassword" nvarchar(255) NOT NULL, CONSTRAINT "UQ_9d0010179a9f8527eaf9e0a1cdc" UNIQUE ("cUsername"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`)
  }
}
