import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { DetallesVoleyService } from './detalles-voley.service'
import { CreateDetallesVoleyDto } from './dtos/create-detalles-voley.dto'
import { CreateDetallesVoleyArrayDto } from './dtos/create-detalles-voley-array.dto'
import { UpdateDetallesVoleyDto } from './dtos/update-detalles-voley.dto'

@UseGuards(JwtAuthGuard)
@Controller('detalles-voley')
export class DetallesVoleyController {
  constructor(private readonly detallesVoleyService: DetallesVoleyService) {}

  @Post()
  create(@Body() createDetallesVoleyDto: CreateDetallesVoleyDto) {
    return this.detallesVoleyService.create(createDetallesVoleyDto)
  }

  @Post('bulk')
  createMany(@Body() createDetallesVoleyArrayDto: CreateDetallesVoleyArrayDto) {
    return this.detallesVoleyService.createMany(createDetallesVoleyArrayDto.sets)
  }

  @Get()
  findAll() {
    return this.detallesVoleyService.findAll()
  }

  @Get('partido/:idPartido')
  findByPartido(@Param('idPartido', ParseIntPipe) idPartido: number) {
    return this.detallesVoleyService.findByPartido(idPartido)
  }

  @Get(':idPartido/:numeroSet')
  findOne(@Param('idPartido', ParseIntPipe) idPartido: number, @Param('numeroSet', ParseIntPipe) numeroSet: number) {
    return this.detallesVoleyService.findOne(idPartido, numeroSet)
  }

  @Patch(':idPartido/:numeroSet')
  update(
    @Param('idPartido', ParseIntPipe) idPartido: number,
    @Param('numeroSet', ParseIntPipe) numeroSet: number,
    @Body() updateDetallesVoleyDto: UpdateDetallesVoleyDto,
  ) {
    return this.detallesVoleyService.update(idPartido, numeroSet, updateDetallesVoleyDto)
  }

  @Delete(':idPartido/:numeroSet')
  remove(@Param('idPartido', ParseIntPipe) idPartido: number, @Param('numeroSet', ParseIntPipe) numeroSet: number) {
    return this.detallesVoleyService.remove(idPartido, numeroSet)
  }

  @Delete('partido/:idPartido')
  removeByPartido(@Param('idPartido', ParseIntPipe) idPartido: number) {
    return this.detallesVoleyService.removeByPartido(idPartido)
  }
}
