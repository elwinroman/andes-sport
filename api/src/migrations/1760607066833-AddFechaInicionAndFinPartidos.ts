import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddFechaInicionAndFinPartidos1760607066833 implements MigrationInterface {
  name = 'AddFechaInicionAndFinPartidos1760607066833'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Partidos" ADD "dFechaInicio" datetime`)
    await queryRunner.query(`ALTER TABLE "Partidos" ADD "dFechaFin" datetime`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Partidos" DROP COLUMN "dFechaFin"`)
    await queryRunner.query(`ALTER TABLE "Partidos" DROP COLUMN "dFechaInicio"`)
  }
}
