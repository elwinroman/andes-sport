import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CreateJugadorDto } from './dtos/create-jugador.dto'
import { CreateJugadorConEquipoDto } from './dtos/create-jugador-con-equipo.dto'
import { UpdateJugadorDto } from './dtos/update-jugador.dto'
import { UpdateJugadorConEquipoDto } from './dtos/update-jugador-con-equipo.dto'
import { JugadorService } from './jugador.service'

@UseGuards(JwtAuthGuard)
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

  @Get('sin-equipo')
  findSinEquipo() {
    return this.jugadorService.findSinEquipo()
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

  @Post('con-equipo')
  createConEquipo(@Body() createJugadorConEquipoDto: CreateJugadorConEquipoDto) {
    return this.jugadorService.createConEquipo(createJugadorConEquipoDto)
  }

  @Patch(':id/con-equipo')
  updateConEquipo(@Param('id', ParseIntPipe) id: number, @Body() updateJugadorConEquipoDto: UpdateJugadorConEquipoDto) {
    return this.jugadorService.updateConEquipo(id, updateJugadorConEquipoDto)
  }
}
