import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EstadoPartido } from '../../entities/estado-partido.entity'
import { EstadoPartidoController } from './estado-partido.controller'
import { EstadoPartidoService } from './estado-partido.service'

@Module({
  imports: [TypeOrmModule.forFeature([EstadoPartido])],
  controllers: [EstadoPartidoController],
  providers: [EstadoPartidoService],
  exports: [EstadoPartidoService],
})
export class EstadoPartidoModule {}
