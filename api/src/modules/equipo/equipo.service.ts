import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Equipo } from '../../entities/equipo.entity'
import { EquipoJugador } from '../../entities/equipo-jugador.entity'
import { getCurrentUTCDate } from '../../utils/date.util'
import { CreateEquipoDto } from './dtos/create-equipo.dto'
import { UpdateEquipoDto } from './dtos/update-equipo.dto'

@Injectable()
export class EquipoService {
  constructor(
    @InjectRepository(Equipo)
    private readonly equipoRepository: Repository<Equipo>,
    @InjectRepository(EquipoJugador)
    private readonly equipoJugadorRepository: Repository<EquipoJugador>,
  ) {}

  async create(createEquipoDto: CreateEquipoDto): Promise<Equipo> {
    const equipo = this.equipoRepository.create(createEquipoDto)
    return await this.equipoRepository.save(equipo)
  }

  async findAll(): Promise<Equipo[]> {
    const equipos = await this.equipoRepository
      .createQueryBuilder('equipo')
      .leftJoinAndSelect('equipo.equipoJugadores', 'equipoJugador', 'equipoJugador.lVigente = :vigente', { vigente: true })
      .leftJoinAndSelect('equipoJugador.jugador', 'jugador')
      .where('equipo.lVigente = :vigente', { vigente: true })
      .orderBy('equipo.cEquipo', 'ASC')
      .getMany()

    return equipos
  }

  async findAllWithoutPlayers(): Promise<Equipo[]> {
    const equipos = await this.equipoRepository.find({
      where: { lVigente: true },
    })

    return equipos
  }

  async findOne(id: number): Promise<Equipo> {
    const equipo = await this.equipoRepository
      .createQueryBuilder('equipo')
      .leftJoinAndSelect('equipo.equipoJugadores', 'equipoJugador', 'equipoJugador.lVigente = :vigente', { vigente: true })
      .leftJoinAndSelect('equipoJugador.jugador', 'jugador')
      .where('equipo.idEquipo = :id', { id })
      .andWhere('equipo.lVigente = :vigente', { vigente: true })
      .getOne()

    if (!equipo) {
      throw new NotFoundException(`Equipo con ID ${id} no encontrado`)
    }

    return equipo
  }

  async update(id: number, updateEquipoDto: UpdateEquipoDto): Promise<Equipo> {
    const equipo = await this.findOne(id)
    equipo.dFechaModifica = getCurrentUTCDate()

    Object.assign(equipo, updateEquipoDto)
    return await this.equipoRepository.save(equipo)
  }

  async remove(id: number): Promise<void> {
    const equipo = await this.findOne(id)

    // Desactivar todas las relaciones equipo-jugador
    const relacionesActivas = await this.equipoJugadorRepository.find({
      where: { idEquipo: id, lVigente: true },
    })

    if (relacionesActivas.length > 0) {
      const fechaActual = getCurrentUTCDate()
      for (const relacion of relacionesActivas) {
        relacion.lVigente = false
        relacion.dFechaModifica = fechaActual
      }
      await this.equipoJugadorRepository.save(relacionesActivas)
    }

    // Desactivar el equipo
    equipo.lVigente = false
    await this.equipoRepository.save(equipo)
  }
}
