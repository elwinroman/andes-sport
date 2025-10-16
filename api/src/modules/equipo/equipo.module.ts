import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Equipo } from '../../entities/equipo.entity'
import { EquipoJugador } from '../../entities/equipo-jugador.entity'
import { EquipoController } from './equipo.controller'
import { EquipoService } from './equipo.service'

@Module({
  imports: [TypeOrmModule.forFeature([Equipo, EquipoJugador])],
  controllers: [EquipoController],
  providers: [EquipoService],
  exports: [EquipoService],
})
export class EquipoModule {}
