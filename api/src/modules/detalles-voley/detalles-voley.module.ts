import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DetallesVoley } from '../../entities/detalles-voley.entity'
import { DetallesVoleyController } from './detalles-voley.controller'
import { DetallesVoleyService } from './detalles-voley.service'

@Module({
  imports: [TypeOrmModule.forFeature([DetallesVoley])],
  controllers: [DetallesVoleyController],
  providers: [DetallesVoleyService],
  exports: [DetallesVoleyService],
})
export class DetallesVoleyModule {}
