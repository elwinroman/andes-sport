import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { EstadoPartido } from '../../entities/estado-partido.entity'
import { CreateEstadoPartidoDto } from './dtos/create-estado-partido.dto'
import { UpdateEstadoPartidoDto } from './dtos/update-estado-partido.dto'

@Injectable()
export class EstadoPartidoService {
  constructor(
    @InjectRepository(EstadoPartido)
    private readonly estadoPartidoRepository: Repository<EstadoPartido>,
  ) {}

  async create(createEstadoPartidoDto: CreateEstadoPartidoDto): Promise<EstadoPartido> {
    const estadoPartido = this.estadoPartidoRepository.create(createEstadoPartidoDto)
    return await this.estadoPartidoRepository.save(estadoPartido)
  }

  async findAll(): Promise<EstadoPartido[]> {
    return await this.estadoPartidoRepository.find({
      where: { lVigente: true },
      order: { dFechaRegistra: 'DESC' },
    })
  }

  async findOne(id: number): Promise<EstadoPartido> {
    const estadoPartido = await this.estadoPartidoRepository.findOne({
      where: { idEstado: id, lVigente: true },
    })

    if (!estadoPartido) {
      throw new NotFoundException(`Estado de partido con ID ${id} no encontrado`)
    }

    return estadoPartido
  }

  async update(id: number, updateEstadoPartidoDto: UpdateEstadoPartidoDto): Promise<EstadoPartido> {
    const estadoPartido = await this.findOne(id)
    estadoPartido.dFechaModifica = new Date()

    Object.assign(estadoPartido, updateEstadoPartidoDto)
    return await this.estadoPartidoRepository.save(estadoPartido)
  }

  async remove(id: number): Promise<void> {
    const estadoPartido = await this.findOne(id)
    estadoPartido.lVigente = false
    await this.estadoPartidoRepository.save(estadoPartido)
  }
}
