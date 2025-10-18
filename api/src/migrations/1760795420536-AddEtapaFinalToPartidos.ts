import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddEtapaFinalToPartidos1760795420536 implements MigrationInterface {
  name = 'AddEtapaFinalToPartidos1760795420536'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Partidos" ADD "lEtapaFinal" bit NOT NULL CONSTRAINT "DF_e33fe29f98c7b93a1034060a03b" DEFAULT 0`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Partidos" DROP CONSTRAINT "DF_e33fe29f98c7b93a1034060a03b"`)
    await queryRunner.query(`ALTER TABLE "Partidos" DROP COLUMN "lEtapaFinal"`)
  }
}
