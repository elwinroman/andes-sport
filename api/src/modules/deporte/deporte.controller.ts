import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { DeporteService } from './deporte.service'
import { CreateDeporteDto } from './dtos/create-deporte.dto'
import { UpdateDeporteDto } from './dtos/update-deporte.dto'

@UseGuards(JwtAuthGuard)
@Controller('deportes')
export class DeporteController {
  constructor(private readonly deporteService: DeporteService) {}

  @Post()
  create(@Body() createDeporteDto: CreateDeporteDto) {
    return this.deporteService.create(createDeporteDto)
  }

  @Get()
  findAll() {
    return this.deporteService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.deporteService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDeporteDto: UpdateDeporteDto) {
    return this.deporteService.update(id, updateDeporteDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.deporteService.remove(id)
  }
}
