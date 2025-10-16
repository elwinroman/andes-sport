import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common'

import { Partido } from '../../entities/partido.entity'
import { CreatePartidoDto } from './dtos/create-partido.dto'
import { CreatePartidosArrayDto } from './dtos/create-partidos-array.dto'
import { UpdatePartidoDto } from './dtos/update-partido.dto'
import { PartidoService } from './partido.service'

@Controller('partidos')
export class PartidoController {
  constructor(private readonly partidoService: PartidoService) {}

  @Post()
  create(@Body() createPartidoDto: CreatePartidoDto) {
    return this.partidoService.create(createPartidoDto)
  }

  @Post('bulk')
  createMany(@Body() createPartidosArrayDto: CreatePartidosArrayDto): Promise<Partido[]> {
    return this.partidoService.createMany(createPartidosArrayDto.partidos)
  }

  @Get()
  findAll() {
    return this.partidoService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.partidoService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePartidoDto: UpdatePartidoDto) {
    return this.partidoService.update(id, updatePartidoDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.partidoService.remove(id)
  }

  @Get('clasificacion/deporte/:idDeporte')
  getClasificacion(@Param('idDeporte', ParseIntPipe) idDeporte: number) {
    return this.partidoService.getClasificacionByDeporte(idDeporte)
  }
}
