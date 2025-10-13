import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common'

import { CreateEquipoDto } from './dtos/create-equipo.dto'
import { UpdateEquipoDto } from './dtos/update-equipo.dto'
import { EquipoService } from './equipo.service'

@Controller('equipos')
export class EquipoController {
  constructor(private readonly equipoService: EquipoService) {}

  @Post()
  create(@Body() createEquipoDto: CreateEquipoDto) {
    return this.equipoService.create(createEquipoDto)
  }

  @Get()
  findAll() {
    return this.equipoService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.equipoService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEquipoDto: UpdateEquipoDto) {
    return this.equipoService.update(id, updateEquipoDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.equipoService.remove(id)
  }
}
