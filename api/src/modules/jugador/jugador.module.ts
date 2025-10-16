import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EquipoJugador } from '../../entities/equipo-jugador.entity'
import { Jugador } from '../../entities/jugador.entity'
import { JugadorController } from './jugador.controller'
import { JugadorService } from './jugador.service'

@Module({
  imports: [TypeOrmModule.forFeature([Jugador, EquipoJugador])],
  controllers: [JugadorController],
  providers: [JugadorService],
  exports: [JugadorService],
})
export class JugadorModule {}
