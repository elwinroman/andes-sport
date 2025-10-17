import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CreateEquipoJugadorDto } from './dtos/create-equipo-jugador.dto'
import { UpdateEquipoJugadorDto } from './dtos/update-equipo-jugador.dto'
import { EquipoJugadorService } from './equipo-jugador.service'

@UseGuards(JwtAuthGuard)
@Controller('equipo-jugador')
export class EquipoJugadorController {
  constructor(private readonly equipoJugadorService: EquipoJugadorService) {}

  @Post()
  create(@Body() createEquipoJugadorDto: CreateEquipoJugadorDto) {
    return this.equipoJugadorService.create(createEquipoJugadorDto)
  }

  @Get()
  findAll() {
    return this.equipoJugadorService.findAll()
  }

  @Get('equipo/:idEquipo')
  findByEquipo(@Param('idEquipo', ParseIntPipe) idEquipo: number) {
    return this.equipoJugadorService.findByEquipo(idEquipo)
  }

  @Get('jugador/:idJugador')
  findByJugador(@Param('idJugador', ParseIntPipe) idJugador: number) {
    return this.equipoJugadorService.findByJugador(idJugador)
  }

  @Get(':idEquipo/:idJugador')
  findOne(@Param('idEquipo', ParseIntPipe) idEquipo: number, @Param('idJugador', ParseIntPipe) idJugador: number) {
    return this.equipoJugadorService.findOne(idEquipo, idJugador)
  }

  @Patch(':idEquipo/:idJugador')
  update(
    @Param('idEquipo', ParseIntPipe) idEquipo: number,
    @Param('idJugador', ParseIntPipe) idJugador: number,
    @Body() updateEquipoJugadorDto: UpdateEquipoJugadorDto,
  ) {
    return this.equipoJugadorService.update(idEquipo, idJugador, updateEquipoJugadorDto)
  }

  @Delete(':idEquipo/:idJugador')
  remove(@Param('idEquipo', ParseIntPipe) idEquipo: number, @Param('idJugador', ParseIntPipe) idJugador: number) {
    return this.equipoJugadorService.remove(idEquipo, idJugador)
  }
}
