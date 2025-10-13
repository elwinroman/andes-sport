import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common'

import { DetallesVoleyService } from './detalles-voley.service'
import { CreateDetallesVoleyDto } from './dtos/create-detalles-voley.dto'
import { UpdateDetallesVoleyDto } from './dtos/update-detalles-voley.dto'

@Controller('detalles-voley')
export class DetallesVoleyController {
  constructor(private readonly detallesVoleyService: DetallesVoleyService) {}

  @Post()
  create(@Body() createDetallesVoleyDto: CreateDetallesVoleyDto) {
    return this.detallesVoleyService.create(createDetallesVoleyDto)
  }

  @Get()
  findAll() {
    return this.detallesVoleyService.findAll()
  }

  @Get(':idPartido')
  findOne(@Param('idPartido', ParseIntPipe) idPartido: number) {
    return this.detallesVoleyService.findOne(idPartido)
  }

  @Patch(':idPartido')
  update(@Param('idPartido', ParseIntPipe) idPartido: number, @Body() updateDetallesVoleyDto: UpdateDetallesVoleyDto) {
    return this.detallesVoleyService.update(idPartido, updateDetallesVoleyDto)
  }

  @Delete(':idPartido')
  remove(@Param('idPartido', ParseIntPipe) idPartido: number) {
    return this.detallesVoleyService.remove(idPartido)
  }
}
