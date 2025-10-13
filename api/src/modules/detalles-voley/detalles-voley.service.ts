import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { DetallesVoley } from '../../entities/detalles-voley.entity'
import { CreateDetallesVoleyDto } from './dtos/create-detalles-voley.dto'
import { UpdateDetallesVoleyDto } from './dtos/update-detalles-voley.dto'

@Injectable()
export class DetallesVoleyService {
  constructor(
    @InjectRepository(DetallesVoley)
    private readonly detallesVoleyRepository: Repository<DetallesVoley>,
  ) {}

  async create(createDetallesVoleyDto: CreateDetallesVoleyDto): Promise<DetallesVoley> {
    const detalles = this.detallesVoleyRepository.create(createDetallesVoleyDto)
    return await this.detallesVoleyRepository.save(detalles)
  }

  async findAll(): Promise<DetallesVoley[]> {
    return await this.detallesVoleyRepository.find({
      relations: ['partido'],
      order: { idPartido: 'DESC' },
    })
  }

  async findOne(idPartido: number): Promise<DetallesVoley> {
    const detalles = await this.detallesVoleyRepository.findOne({
      where: { idPartido },
      relations: ['partido'],
    })

    if (!detalles) {
      throw new NotFoundException(`Detalles de voley para el partido ${idPartido} no encontrados`)
    }

    return detalles
  }

  async update(idPartido: number, updateDetallesVoleyDto: UpdateDetallesVoleyDto): Promise<DetallesVoley> {
    const detalles = await this.findOne(idPartido)
    Object.assign(detalles, updateDetallesVoleyDto)
    return await this.detallesVoleyRepository.save(detalles)
  }

  async remove(idPartido: number): Promise<void> {
    const detalles = await this.findOne(idPartido)
    await this.detallesVoleyRepository.remove(detalles)
  }
}
