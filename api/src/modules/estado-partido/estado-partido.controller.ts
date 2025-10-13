import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common'

import { CreateEstadoPartidoDto } from './dtos/create-estado-partido.dto'
import { UpdateEstadoPartidoDto } from './dtos/update-estado-partido.dto'
import { EstadoPartidoService } from './estado-partido.service'

@Controller('estados-partido')
export class EstadoPartidoController {
  constructor(private readonly estadoPartidoService: EstadoPartidoService) {}

  @Post()
  create(@Body() createEstadoPartidoDto: CreateEstadoPartidoDto) {
    return this.estadoPartidoService.create(createEstadoPartidoDto)
  }

  @Get()
  findAll() {
    return this.estadoPartidoService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.estadoPartidoService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEstadoPartidoDto: UpdateEstadoPartidoDto) {
    return this.estadoPartidoService.update(id, updateEstadoPartidoDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.estadoPartidoService.remove(id)
  }
}
