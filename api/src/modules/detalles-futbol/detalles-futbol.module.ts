import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DetallesFutbol } from '../../entities/detalles-futbol.entity'
import { DetallesFutbolController } from './detalles-futbol.controller'
import { DetallesFutbolService } from './detalles-futbol.service'

@Module({
  imports: [TypeOrmModule.forFeature([DetallesFutbol])],
  controllers: [DetallesFutbolController],
  providers: [DetallesFutbolService],
  exports: [DetallesFutbolService],
})
export class DetallesFutbolModule {}
