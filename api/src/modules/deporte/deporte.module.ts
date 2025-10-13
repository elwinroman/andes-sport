import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Deporte } from '../../entities/deporte.entity'
import { DeporteController } from './deporte.controller'
import { DeporteService } from './deporte.service'

@Module({
  imports: [TypeOrmModule.forFeature([Deporte])],
  controllers: [DeporteController],
  providers: [DeporteService],
  exports: [DeporteService],
})
export class DeporteModule {}
