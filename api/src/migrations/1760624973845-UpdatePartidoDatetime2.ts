import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdatePartidoDatetime21760624973845 implements MigrationInterface {
  name = 'UpdatePartidoDatetime21760624973845'

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Cambiar columnas de datetime a datetime2 preservando los datos existentes
    await queryRunner.query(`ALTER TABLE "Partidos" ALTER COLUMN "dFechaEvento" datetime2`)
    await queryRunner.query(`ALTER TABLE "Partidos" ALTER COLUMN "dFechaInicio" datetime2`)
    await queryRunner.query(`ALTER TABLE "Partidos" ALTER COLUMN "dFechaFin" datetime2`)

    // Para dFechaRegistra necesitamos remover el constraint, alterar y volver a agregar
    await queryRunner.query(`ALTER TABLE "Partidos" DROP CONSTRAINT "DF_368c7969ebc21f0f6b698058ece"`)
    await queryRunner.query(`ALTER TABLE "Partidos" ALTER COLUMN "dFechaRegistra" datetime2 NOT NULL`)
    await queryRunner.query(`ALTER TABLE "Partidos" ADD CONSTRAINT "DF_368c7969ebc21f0f6b698058ece" DEFAULT getdate() FOR "dFechaRegistra"`)

    await queryRunner.query(`ALTER TABLE "Partidos" ALTER COLUMN "dFechaModifica" datetime2`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revertir a datetime preservando los datos
    await queryRunner.query(`ALTER TABLE "Partidos" ALTER COLUMN "dFechaModifica" datetime`)

    await queryRunner.query(`ALTER TABLE "Partidos" DROP CONSTRAINT "DF_368c7969ebc21f0f6b698058ece"`)
    await queryRunner.query(`ALTER TABLE "Partidos" ALTER COLUMN "dFechaRegistra" datetime NOT NULL`)
    await queryRunner.query(`ALTER TABLE "Partidos" ADD CONSTRAINT "DF_368c7969ebc21f0f6b698058ece" DEFAULT getdate() FOR "dFechaRegistra"`)

    await queryRunner.query(`ALTER TABLE "Partidos" ALTER COLUMN "dFechaFin" datetime`)
    await queryRunner.query(`ALTER TABLE "Partidos" ALTER COLUMN "dFechaInicio" datetime`)
    await queryRunner.query(`ALTER TABLE "Partidos" ALTER COLUMN "dFechaEvento" datetime`)
  }
}
