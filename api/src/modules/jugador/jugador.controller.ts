import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CreateJugadorDto } from './dtos/create-jugador.dto'
import { CreateJugadorConEquipoDto } from './dtos/create-jugador-con-equipo.dto'
import { UpdateJugadorDto } from './dtos/update-jugador.dto'
import { UpdateJugadorConEquipoDto } from './dtos/update-jugador-con-equipo.dto'
import { JugadorService } from './jugador.service'

@Controller('jugadores')
export class JugadorController {
  constructor(private readonly jugadorService: JugadorService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createJugadorDto: CreateJugadorDto) {
    return this.jugadorService.create(createJugadorDto)
  }

  @Get()
  findAll(@Query('idEquipo', new ParseIntPipe({ optional: true })) idEquipo?: number) {
    return this.jugadorService.findAll(idEquipo)
  }

  @UseGuards(JwtAuthGuard)
  @Get('sin-equipo')
  findSinEquipo() {
    return this.jugadorService.findSinEquipo()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.jugadorService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateJugadorDto: UpdateJugadorDto) {
    return this.jugadorService.update(id, updateJugadorDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.jugadorService.remove(id)
  }

  @UseGuards(JwtAuthGuard)
  @Post('con-equipo')
  createConEquipo(@Body() createJugadorConEquipoDto: CreateJugadorConEquipoDto) {
    return this.jugadorService.createConEquipo(createJugadorConEquipoDto)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/con-equipo')
  updateConEquipo(@Param('id', ParseIntPipe) id: number, @Body() updateJugadorConEquipoDto: UpdateJugadorConEquipoDto) {
    return this.jugadorService.updateConEquipo(id, updateJugadorConEquipoDto)
  }
}
