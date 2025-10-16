import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateDetallesVoleyMultipleSets1760628137609 implements MigrationInterface {
  name = 'UpdateDetallesVoleyMultipleSets1760628137609'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "DetallesVoley" DROP COLUMN "nSetsEquipoLocal"`)
    await queryRunner.query(`ALTER TABLE "DetallesVoley" DROP COLUMN "nSetsEquipoVisitante"`)
    await queryRunner.query(`ALTER TABLE "DetallesVoley" ADD "nNumeroSet" int NOT NULL`)
    await queryRunner.query(`ALTER TABLE "DetallesVoley" DROP CONSTRAINT "PK_5344b626ca33009e58f51e26f27"`)
    await queryRunner.query(
      `ALTER TABLE "DetallesVoley" ADD CONSTRAINT "PK_2921e97c445171b31af80c953a1" PRIMARY KEY ("idPartido", "nNumeroSet")`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "DetallesVoley" DROP CONSTRAINT "PK_2921e97c445171b31af80c953a1"`)
    await queryRunner.query(`ALTER TABLE "DetallesVoley" ADD CONSTRAINT "PK_5344b626ca33009e58f51e26f27" PRIMARY KEY ("idPartido")`)
    await queryRunner.query(`ALTER TABLE "DetallesVoley" DROP COLUMN "nNumeroSet"`)
    await queryRunner.query(`ALTER TABLE "DetallesVoley" ADD "nSetsEquipoVisitante" int`)
    await queryRunner.query(`ALTER TABLE "DetallesVoley" ADD "nSetsEquipoLocal" int`)
  }
}
