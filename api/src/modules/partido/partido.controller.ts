import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common'

import { Partido } from '../../entities/partido.entity'
import { JwtAuthGuard } from './../auth/jwt-auth.guard'
import { CreatePartidoDto } from './dtos/create-partido.dto'
import { CreatePartidosArrayDto } from './dtos/create-partidos-array.dto'
import { UpdatePartidoDto } from './dtos/update-partido.dto'
import { PartidoService } from './partido.service'

@Controller('partidos')
export class PartidoController {
  constructor(private readonly partidoService: PartidoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPartidoDto: CreatePartidoDto) {
    return this.partidoService.create(createPartidoDto)
  }

  @UseGuards(JwtAuthGuard)
  @Post('bulk')
  createMany(@Body() createPartidosArrayDto: CreatePartidosArrayDto): Promise<Partido[]> {
    return this.partidoService.createMany(createPartidosArrayDto.partidos)
  }

  @Get()
  findAll(@Query('idDeporte', new ParseIntPipe({ optional: true })) idDeporte?: number, @Query('lEtapaFinal') lEtapaFinal?: string) {
    // Convertir string a boolean si viene el parámetro
    const esEtapaFinal = lEtapaFinal === 'true' ? true : lEtapaFinal === 'false' ? false : undefined
    return this.partidoService.findAll(idDeporte, esEtapaFinal)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.partidoService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePartidoDto: UpdatePartidoDto) {
    return this.partidoService.update(id, updatePartidoDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.partidoService.remove(id)
  }

  @Get('clasificacion/deporte/:idDeporte')
  getClasificacion(@Param('idDeporte', ParseIntPipe) idDeporte: number) {
    return this.partidoService.getClasificacionByDeporte(idDeporte)
  }
}
