import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Equipo } from '../../entities/equipo.entity'
import { CreateEquipoDto } from './dtos/create-equipo.dto'
import { UpdateEquipoDto } from './dtos/update-equipo.dto'

@Injectable()
export class EquipoService {
  constructor(
    @InjectRepository(Equipo)
    private readonly equipoRepository: Repository<Equipo>,
  ) {}

  async create(createEquipoDto: CreateEquipoDto): Promise<Equipo> {
    const equipo = this.equipoRepository.create(createEquipoDto)
    return await this.equipoRepository.save(equipo)
  }

  async findAll(): Promise<Equipo[]> {
    return await this.equipoRepository.find({
      where: { lVigente: true },
      order: { dFechaRegistra: 'DESC' },
    })
  }

  async findOne(id: number): Promise<Equipo> {
    const equipo = await this.equipoRepository.findOne({
      where: { idEquipo: id, lVigente: true },
    })

    if (!equipo) {
      throw new NotFoundException(`Equipo con ID ${id} no encontrado`)
    }

    return equipo
  }

  async update(id: number, updateEquipoDto: UpdateEquipoDto): Promise<Equipo> {
    const equipo = await this.findOne(id)
    equipo.dFechaModifica = new Date()

    Object.assign(equipo, updateEquipoDto)
    return await this.equipoRepository.save(equipo)
  }

  async remove(id: number): Promise<void> {
    const equipo = await this.findOne(id)
    equipo.lVigente = false
    await this.equipoRepository.save(equipo)
  }
}
