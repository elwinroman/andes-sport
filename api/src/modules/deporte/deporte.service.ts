import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Deporte } from '../../entities/deporte.entity'
import { CreateDeporteDto } from './dtos/create-deporte.dto'
import { UpdateDeporteDto } from './dtos/update-deporte.dto'

@Injectable()
export class DeporteService {
  constructor(
    @InjectRepository(Deporte)
    private readonly deporteRepository: Repository<Deporte>,
  ) {}

  async create(createDeporteDto: CreateDeporteDto): Promise<Deporte> {
    const deporte = this.deporteRepository.create(createDeporteDto)
    return await this.deporteRepository.save(deporte)
  }

  async findAll(): Promise<Deporte[]> {
    return await this.deporteRepository.find({
      where: { lVigente: true },
      order: { dFechaRegistra: 'DESC' },
    })
  }

  async findOne(id: number): Promise<Deporte> {
    const deporte = await this.deporteRepository.findOne({
      where: { idDeporte: id, lVigente: true },
    })

    if (!deporte) {
      throw new NotFoundException(`Deporte con ID ${id} no encontrado`)
    }

    return deporte
  }

  async update(id: number, updateDeporteDto: UpdateDeporteDto): Promise<Deporte> {
    const deporte = await this.findOne(id)
    deporte.dFechaModifica = new Date()

    Object.assign(deporte, updateDeporteDto)
    return await this.deporteRepository.save(deporte)
  }

  async remove(id: number): Promise<void> {
    const deporte = await this.findOne(id)
    deporte.lVigente = false
    await this.deporteRepository.save(deporte)
  }
}
