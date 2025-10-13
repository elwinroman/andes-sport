import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { EquipoJugador } from '../../entities/equipo-jugador.entity'
import { CreateEquipoJugadorDto } from './dtos/create-equipo-jugador.dto'
import { UpdateEquipoJugadorDto } from './dtos/update-equipo-jugador.dto'

@Injectable()
export class EquipoJugadorService {
  constructor(
    @InjectRepository(EquipoJugador)
    private readonly equipoJugadorRepository: Repository<EquipoJugador>,
  ) {}

  async create(createEquipoJugadorDto: CreateEquipoJugadorDto): Promise<EquipoJugador> {
    const equipoJugador = this.equipoJugadorRepository.create(createEquipoJugadorDto)
    return await this.equipoJugadorRepository.save(equipoJugador)
  }

  async findAll(): Promise<EquipoJugador[]> {
    return await this.equipoJugadorRepository.find({
      where: { lVigente: true },
      relations: ['equipo', 'jugador'],
      order: { dFechaRegistra: 'DESC' },
    })
  }

  async findByEquipo(idEquipo: number): Promise<EquipoJugador[]> {
    return await this.equipoJugadorRepository.find({
      where: { idEquipo, lVigente: true },
      relations: ['jugador'],
      order: { dFechaRegistra: 'DESC' },
    })
  }

  async findByJugador(idJugador: number): Promise<EquipoJugador[]> {
    return await this.equipoJugadorRepository.find({
      where: { idJugador, lVigente: true },
      relations: ['equipo'],
      order: { dFechaRegistra: 'DESC' },
    })
  }

  async findOne(idEquipo: number, idJugador: number): Promise<EquipoJugador> {
    const equipoJugador = await this.equipoJugadorRepository.findOne({
      where: { idEquipo, idJugador, lVigente: true },
      relations: ['equipo', 'jugador'],
    })

    if (!equipoJugador) {
      throw new NotFoundException(`Relación Equipo-Jugador no encontrada`)
    }

    return equipoJugador
  }

  async update(idEquipo: number, idJugador: number, updateEquipoJugadorDto: UpdateEquipoJugadorDto): Promise<EquipoJugador> {
    const equipoJugador = await this.findOne(idEquipo, idJugador)
    equipoJugador.dFechaModifica = new Date()

    Object.assign(equipoJugador, updateEquipoJugadorDto)
    return await this.equipoJugadorRepository.save(equipoJugador)
  }

  async remove(idEquipo: number, idJugador: number): Promise<void> {
    const equipoJugador = await this.findOne(idEquipo, idJugador)
    equipoJugador.lVigente = false
    await this.equipoJugadorRepository.save(equipoJugador)
  }
}
