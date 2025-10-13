import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common'

import { DetallesFutbolService } from './detalles-futbol.service'
import { CreateDetallesFutbolDto } from './dtos/create-detalles-futbol.dto'
import { UpdateDetallesFutbolDto } from './dtos/update-detalles-futbol.dto'

@Controller('detalles-futbol')
export class DetallesFutbolController {
  constructor(private readonly detallesFutbolService: DetallesFutbolService) {}

  @Post()
  create(@Body() createDetallesFutbolDto: CreateDetallesFutbolDto) {
    return this.detallesFutbolService.create(createDetallesFutbolDto)
  }

  @Get()
  findAll() {
    return this.detallesFutbolService.findAll()
  }

  @Get(':idPartido')
  findOne(@Param('idPartido', ParseIntPipe) idPartido: number) {
    return this.detallesFutbolService.findOne(idPartido)
  }

  @Patch(':idPartido')
  update(@Param('idPartido', ParseIntPipe) idPartido: number, @Body() updateDetallesFutbolDto: UpdateDetallesFutbolDto) {
    return this.detallesFutbolService.update(idPartido, updateDetallesFutbolDto)
  }

  @Delete(':idPartido')
  remove(@Param('idPartido', ParseIntPipe) idPartido: number) {
    return this.detallesFutbolService.remove(idPartido)
  }
}
