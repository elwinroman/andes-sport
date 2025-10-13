import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EquipoJugador } from '../../entities/equipo-jugador.entity'
import { EquipoJugadorController } from './equipo-jugador.controller'
import { EquipoJugadorService } from './equipo-jugador.service'

@Module({
  imports: [TypeOrmModule.forFeature([EquipoJugador])],
  controllers: [EquipoJugadorController],
  providers: [EquipoJugadorService],
  exports: [EquipoJugadorService],
})
export class EquipoJugadorModule {}
