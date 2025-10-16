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

  async createMany(createDetallesVoleyDtos: CreateDetallesVoleyDto[]): Promise<DetallesVoley[]> {
    const detalles = this.detallesVoleyRepository.create(createDetallesVoleyDtos)
    return await this.detallesVoleyRepository.save(detalles)
  }

  async findAll(): Promise<DetallesVoley[]> {
    return await this.detallesVoleyRepository.find({
      relations: ['partido'],
      order: { idPartido: 'DESC', numeroSet: 'ASC' },
    })
  }

  async findByPartido(idPartido: number): Promise<DetallesVoley[]> {
    return await this.detallesVoleyRepository.find({
      where: { idPartido },
      order: { numeroSet: 'ASC' },
    })
  }

  async findOne(idPartido: number, numeroSet: number): Promise<DetallesVoley> {
    const detalles = await this.detallesVoleyRepository.findOne({
      where: { idPartido, numeroSet },
      relations: ['partido'],
    })

    if (!detalles) {
      throw new NotFoundException(`Detalles del set ${numeroSet} para el partido ${idPartido} no encontrados`)
    }

    return detalles
  }

  async update(idPartido: number, numeroSet: number, updateDetallesVoleyDto: UpdateDetallesVoleyDto): Promise<DetallesVoley> {
    const detalles = await this.findOne(idPartido, numeroSet)
    Object.assign(detalles, updateDetallesVoleyDto)
    return await this.detallesVoleyRepository.save(detalles)
  }

  async remove(idPartido: number, numeroSet: number): Promise<void> {
    const detalles = await this.findOne(idPartido, numeroSet)
    await this.detallesVoleyRepository.remove(detalles)
  }

  async removeByPartido(idPartido: number): Promise<void> {
    await this.detallesVoleyRepository.delete({ idPartido })
  }
}
