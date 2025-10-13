import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitialSchema1760307807180 implements MigrationInterface {
  name = 'InitialSchema1760307807180'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Deporte" ("idDeporte" int NOT NULL IDENTITY(1,1), "cDeporte" varchar(200) NOT NULL, "cDetalles" varchar(200), "lVigente" bit NOT NULL CONSTRAINT "DF_697af945229b3b9308946eaeb6b" DEFAULT 1, "dFechaRegistra" datetime NOT NULL CONSTRAINT "DF_f4f1eff9dae6821584236b138ee" DEFAULT getdate(), "dFechaModifica" datetime CONSTRAINT "DF_827bb9f7ac69b7d62fd5605325e" DEFAULT getdate(), CONSTRAINT "PK_3bca758d0b4f0bfae8731cc9ced" PRIMARY KEY ("idDeporte"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "EstadoPartido" ("idEstado" int NOT NULL IDENTITY(1,1), "cEstado" varchar(100) NOT NULL, "lVigente" bit NOT NULL CONSTRAINT "DF_03de677c9b197a45aa1a517914e" DEFAULT 1, "dFechaRegistra" datetime NOT NULL CONSTRAINT "DF_daa0a9013758dc393d94408b314" DEFAULT getdate(), "dFechaModifica" datetime CONSTRAINT "DF_ba8d30477b797529717c686b6ff" DEFAULT getdate(), CONSTRAINT "PK_eae000ac057625e62e9310b0b63" PRIMARY KEY ("idEstado"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "Partidos" ("idPartido" int NOT NULL IDENTITY(1,1), "idDeporte" int, "idEquipoLocal" int, "idEquipoVisitante" int, "dFechaEvento" datetime, "idEstado" int, "lVigente" bit NOT NULL CONSTRAINT "DF_61d387f2a962be3e8fa9c2b2d93" DEFAULT 1, "dFechaRegistra" datetime NOT NULL CONSTRAINT "DF_368c7969ebc21f0f6b698058ece" DEFAULT getdate(), "dFechaModifica" datetime CONSTRAINT "DF_fb1e835d2fb1034314fc71cd0b7" DEFAULT getdate(), CONSTRAINT "PK_bb8caf5a15706a6c8425b642a29" PRIMARY KEY ("idPartido"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "Equipo" ("idEquipo" int NOT NULL IDENTITY(1,1), "cEquipo" varchar(200) NOT NULL, "cDetalle" varchar(200), "lVigente" bit NOT NULL CONSTRAINT "DF_bf030696e8111b8eea74423f987" DEFAULT 1, "dFechaRegistra" datetime NOT NULL CONSTRAINT "DF_1e55031d850d7d8c678b1fb2d2d" DEFAULT getdate(), "dFechaModifica" datetime CONSTRAINT "DF_970991e4614dba97eff87cbc77c" DEFAULT getdate(), CONSTRAINT "PK_835ff3b3172b62f77e909d445f4" PRIMARY KEY ("idEquipo"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "EquipoJugador" ("idEquipo" int NOT NULL, "idJugador" int NOT NULL, "lVigente" bit NOT NULL CONSTRAINT "DF_885e8a46a2c2be0e022976f5b0e" DEFAULT 1, "dFechaRegistra" datetime NOT NULL CONSTRAINT "DF_929e48aef71e1fc816ebb934f85" DEFAULT getdate(), "dFechaModifica" datetime CONSTRAINT "DF_df46bfab1f441c87493eeacf043" DEFAULT getdate(), CONSTRAINT "PK_b5667ed3fb6eea7f6f25d6f2972" PRIMARY KEY ("idEquipo", "idJugador"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "Jugador" ("idJugador" int NOT NULL IDENTITY(1,1), "cNombreJugador" varchar(200) NOT NULL, "cApellidoJugador" varchar(200) NOT NULL, "lVigente" bit NOT NULL CONSTRAINT "DF_dc02ed9db0760a8b586f25b1601" DEFAULT 1, "dFechaRegistra" datetime NOT NULL CONSTRAINT "DF_40c4fa358536cdb45c3f9fdb7d4" DEFAULT getdate(), "dFechaModifica" datetime CONSTRAINT "DF_7853a55123b7491c107ad50ca6e" DEFAULT getdate(), CONSTRAINT "PK_c8cd55321705332407278f12a71" PRIMARY KEY ("idJugador"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "DetallesVoley" ("idPartido" int NOT NULL, "setsEquipoLocal" int, "setsEquipoVisitante" int, "puntosEquipoLocal" int, "puntosEquipoVisitante" int, CONSTRAINT "PK_5344b626ca33009e58f51e26f27" PRIMARY KEY ("idPartido"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "DetallesFutbol" ("idPartido" int NOT NULL, "golesEquipoLocal" int, "golesEquipoVisitante" int, CONSTRAINT "PK_e8c335f8510f29352ffd702ebc3" PRIMARY KEY ("idPartido"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "Partidos" ADD CONSTRAINT "FK_a0cba0af1bea2fb9b29734e16d2" FOREIGN KEY ("idDeporte") REFERENCES "Deporte"("idDeporte") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "Partidos" ADD CONSTRAINT "FK_0a4a521b509a4679d2d5fe9fa51" FOREIGN KEY ("idEquipoLocal") REFERENCES "Equipo"("idEquipo") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "Partidos" ADD CONSTRAINT "FK_7d361fe8d52405422d32fb88a33" FOREIGN KEY ("idEquipoVisitante") REFERENCES "Equipo"("idEquipo") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "Partidos" ADD CONSTRAINT "FK_428c60211db8a03951b0308f2b1" FOREIGN KEY ("idEstado") REFERENCES "EstadoPartido"("idEstado") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "EquipoJugador" ADD CONSTRAINT "FK_f4c95de83059e5f74b23df9fa1e" FOREIGN KEY ("idEquipo") REFERENCES "Equipo"("idEquipo") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "EquipoJugador" ADD CONSTRAINT "FK_6d7c0bdda7e92d4c053f55fbc32" FOREIGN KEY ("idJugador") REFERENCES "Jugador"("idJugador") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "DetallesVoley" ADD CONSTRAINT "FK_5344b626ca33009e58f51e26f27" FOREIGN KEY ("idPartido") REFERENCES "Partidos"("idPartido") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "DetallesFutbol" ADD CONSTRAINT "FK_e8c335f8510f29352ffd702ebc3" FOREIGN KEY ("idPartido") REFERENCES "Partidos"("idPartido") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "DetallesFutbol" DROP CONSTRAINT "FK_e8c335f8510f29352ffd702ebc3"`)
    await queryRunner.query(`ALTER TABLE "DetallesVoley" DROP CONSTRAINT "FK_5344b626ca33009e58f51e26f27"`)
    await queryRunner.query(`ALTER TABLE "EquipoJugador" DROP CONSTRAINT "FK_6d7c0bdda7e92d4c053f55fbc32"`)
    await queryRunner.query(`ALTER TABLE "EquipoJugador" DROP CONSTRAINT "FK_f4c95de83059e5f74b23df9fa1e"`)
    await queryRunner.query(`ALTER TABLE "Partidos" DROP CONSTRAINT "FK_428c60211db8a03951b0308f2b1"`)
    await queryRunner.query(`ALTER TABLE "Partidos" DROP CONSTRAINT "FK_7d361fe8d52405422d32fb88a33"`)
    await queryRunner.query(`ALTER TABLE "Partidos" DROP CONSTRAINT "FK_0a4a521b509a4679d2d5fe9fa51"`)
    await queryRunner.query(`ALTER TABLE "Partidos" DROP CONSTRAINT "FK_a0cba0af1bea2fb9b29734e16d2"`)
    await queryRunner.query(`DROP TABLE "DetallesFutbol"`)
    await queryRunner.query(`DROP TABLE "DetallesVoley"`)
    await queryRunner.query(`DROP TABLE "Jugador"`)
    await queryRunner.query(`DROP TABLE "EquipoJugador"`)
    await queryRunner.query(`DROP TABLE "Equipo"`)
    await queryRunner.query(`DROP TABLE "Partidos"`)
    await queryRunner.query(`DROP TABLE "EstadoPartido"`)
    await queryRunner.query(`DROP TABLE "Deporte"`)
  }
}
