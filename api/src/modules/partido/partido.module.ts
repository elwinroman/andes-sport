import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DetallesFutbol } from '../../entities/detalles-futbol.entity'
import { DetallesVoley } from '../../entities/detalles-voley.entity'
import { Partido } from '../../entities/partido.entity'
import { PartidoController } from './partido.controller'
import { PartidoService } from './partido.service'

@Module({
  imports: [TypeOrmModule.forFeature([Partido, DetallesFutbol, DetallesVoley])],
  controllers: [PartidoController],
  providers: [PartidoService],
  exports: [PartidoService],
})
export class PartidoModule {}
