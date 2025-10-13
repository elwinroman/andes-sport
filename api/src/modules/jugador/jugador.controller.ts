import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common'

import { CreateJugadorDto } from './dtos/create-jugador.dto'
import { UpdateJugadorDto } from './dtos/update-jugador.dto'
import { JugadorService } from './jugador.service'

@Controller('jugadores')
export class JugadorController {
  constructor(private readonly jugadorService: JugadorService) {}

  @Post()
  create(@Body() createJugadorDto: CreateJugadorDto) {
    return this.jugadorService.create(createJugadorDto)
  }

  @Get()
  findAll() {
    return this.jugadorService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.jugadorService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateJugadorDto: UpdateJugadorDto) {
    return this.jugadorService.update(id, updateJugadorDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.jugadorService.remove(id)
  }
}
