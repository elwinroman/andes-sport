import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateEntities1760326188888 implements MigrationInterface {
  name = 'UpdateEntities1760326188888'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "DetallesVoley" DROP COLUMN "setsEquipoLocal"`)
    await queryRunner.query(`ALTER TABLE "DetallesVoley" DROP COLUMN "setsEquipoVisitante"`)
    await queryRunner.query(`ALTER TABLE "DetallesVoley" DROP COLUMN "puntosEquipoLocal"`)
    await queryRunner.query(`ALTER TABLE "DetallesVoley" DROP COLUMN "puntosEquipoVisitante"`)
    await queryRunner.query(`ALTER TABLE "DetallesFutbol" DROP COLUMN "golesEquipoLocal"`)
    await queryRunner.query(`ALTER TABLE "DetallesFutbol" DROP COLUMN "golesEquipoVisitante"`)
    await queryRunner.query(`ALTER TABLE "DetallesVoley" ADD "nSetsEquipoLocal" int`)
    await queryRunner.query(`ALTER TABLE "DetallesVoley" ADD "nSetsEquipoVisitante" int`)
    await queryRunner.query(`ALTER TABLE "DetallesVoley" ADD "nPuntosEquipoLocal" int`)
    await queryRunner.query(`ALTER TABLE "DetallesVoley" ADD "nPuntosEquipoVisitante" int`)
    await queryRunner.query(`ALTER TABLE "DetallesFutbol" ADD "nGolesEquipoLocal" int`)
    await queryRunner.query(`ALTER TABLE "DetallesFutbol" ADD "nGolesEquipoVisitante" int`)
    await queryRunner.query(`ALTER TABLE "Deporte" DROP CONSTRAINT "DF_827bb9f7ac69b7d62fd5605325e"`)
    await queryRunner.query(`ALTER TABLE "Jugador" DROP CONSTRAINT "DF_7853a55123b7491c107ad50ca6e"`)
    await queryRunner.query(`ALTER TABLE "EquipoJugador" DROP CONSTRAINT "DF_df46bfab1f441c87493eeacf043"`)
    await queryRunner.query(`ALTER TABLE "Equipo" DROP CONSTRAINT "DF_970991e4614dba97eff87cbc77c"`)
    await queryRunner.query(`ALTER TABLE "EstadoPartido" DROP CONSTRAINT "DF_ba8d30477b797529717c686b6ff"`)
    await queryRunner.query(`ALTER TABLE "Partidos" DROP CONSTRAINT "DF_fb1e835d2fb1034314fc71cd0b7"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Partidos" ADD CONSTRAINT "DF_fb1e835d2fb1034314fc71cd0b7" DEFAULT getdate() FOR "dFechaModifica"`)
    await queryRunner.query(
      `ALTER TABLE "EstadoPartido" ADD CONSTRAINT "DF_ba8d30477b797529717c686b6ff" DEFAULT getdate() FOR "dFechaModifica"`,
    )
    await queryRunner.query(`ALTER TABLE "Equipo" ADD CONSTRAINT "DF_970991e4614dba97eff87cbc77c" DEFAULT getdate() FOR "dFechaModifica"`)
    await queryRunner.query(
      `ALTER TABLE "EquipoJugador" ADD CONSTRAINT "DF_df46bfab1f441c87493eeacf043" DEFAULT getdate() FOR "dFechaModifica"`,
    )
    await queryRunner.query(`ALTER TABLE "Jugador" ADD CONSTRAINT "DF_7853a55123b7491c107ad50ca6e" DEFAULT getdate() FOR "dFechaModifica"`)
    await queryRunner.query(`ALTER TABLE "Deporte" ADD CONSTRAINT "DF_827bb9f7ac69b7d62fd5605325e" DEFAULT getdate() FOR "dFechaModifica"`)
    await queryRunner.query(`ALTER TABLE "DetallesFutbol" DROP COLUMN "nGolesEquipoVisitante"`)
    await queryRunner.query(`ALTER TABLE "DetallesFutbol" DROP COLUMN "nGolesEquipoLocal"`)
    await queryRunner.query(`ALTER TABLE "DetallesVoley" DROP COLUMN "nPuntosEquipoVisitante"`)
    await queryRunner.query(`ALTER TABLE "DetallesVoley" DROP COLUMN "nPuntosEquipoLocal"`)
    await queryRunner.query(`ALTER TABLE "DetallesVoley" DROP COLUMN "nSetsEquipoVisitante"`)
    await queryRunner.query(`ALTER TABLE "DetallesVoley" DROP COLUMN "nSetsEquipoLocal"`)
    await queryRunner.query(`ALTER TABLE "DetallesFutbol" ADD "golesEquipoVisitante" int`)
    await queryRunner.query(`ALTER TABLE "DetallesFutbol" ADD "golesEquipoLocal" int`)
    await queryRunner.query(`ALTER TABLE "DetallesVoley" ADD "puntosEquipoVisitante" int`)
    await queryRunner.query(`ALTER TABLE "DetallesVoley" ADD "puntosEquipoLocal" int`)
    await queryRunner.query(`ALTER TABLE "DetallesVoley" ADD "setsEquipoVisitante" int`)
    await queryRunner.query(`ALTER TABLE "DetallesVoley" ADD "setsEquipoLocal" int`)
  }
}
