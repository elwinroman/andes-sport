import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { DetallesFutbol } from '../../entities/detalles-futbol.entity'
import { CreateDetallesFutbolDto } from './dtos/create-detalles-futbol.dto'
import { UpdateDetallesFutbolDto } from './dtos/update-detalles-futbol.dto'

@Injectable()
export class DetallesFutbolService {
  constructor(
    @InjectRepository(DetallesFutbol)
    private readonly detallesFutbolRepository: Repository<DetallesFutbol>,
  ) {}

  async create(createDetallesFutbolDto: CreateDetallesFutbolDto): Promise<DetallesFutbol> {
    const detalles = this.detallesFutbolRepository.create(createDetallesFutbolDto)
    return await this.detallesFutbolRepository.save(detalles)
  }

  async findAll(): Promise<DetallesFutbol[]> {
    return await this.detallesFutbolRepository.find({
      relations: ['partido'],
      order: { idPartido: 'DESC' },
    })
  }

  async findOne(idPartido: number): Promise<DetallesFutbol> {
    const detalles = await this.detallesFutbolRepository.findOne({
      where: { idPartido },
      relations: ['partido'],
    })

    if (!detalles) {
      throw new NotFoundException(`Detalles de fútbol para el partido ${idPartido} no encontrados`)
    }

    return detalles
  }

  async update(idPartido: number, updateDetallesFutbolDto: UpdateDetallesFutbolDto): Promise<DetallesFutbol> {
    const detalles = await this.findOne(idPartido)
    Object.assign(detalles, updateDetallesFutbolDto)
    return await this.detallesFutbolRepository.save(detalles)
  }

  async remove(idPartido: number): Promise<void> {
    const detalles = await this.findOne(idPartido)
    await this.detallesFutbolRepository.remove(detalles)
  }
}
