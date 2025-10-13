import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Jugador } from '../../entities/jugador.entity'
import { CreateJugadorDto } from './dtos/create-jugador.dto'
import { UpdateJugadorDto } from './dtos/update-jugador.dto'

@Injectable()
export class JugadorService {
  constructor(
    @InjectRepository(Jugador)
    private readonly jugadorRepository: Repository<Jugador>,
  ) {}

  async create(createJugadorDto: CreateJugadorDto): Promise<Jugador> {
    const jugador = this.jugadorRepository.create(createJugadorDto)
    return await this.jugadorRepository.save(jugador)
  }

  async findAll(): Promise<Jugador[]> {
    return await this.jugadorRepository.find({
      where: { lVigente: true },
      order: { dFechaRegistra: 'DESC' },
    })
  }

  async findOne(id: number): Promise<Jugador> {
    const jugador = await this.jugadorRepository.findOne({
      where: { idJugador: id, lVigente: true },
    })

    if (!jugador) {
      throw new NotFoundException(`Jugador con ID ${id} no encontrado`)
    }

    return jugador
  }

  async update(id: number, updateJugadorDto: UpdateJugadorDto): Promise<Jugador> {
    const jugador = await this.findOne(id)
    jugador.dFechaModifica = new Date()

    Object.assign(jugador, updateJugadorDto)
    return await this.jugadorRepository.save(jugador)
  }

  async remove(id: number): Promise<void> {
    const jugador = await this.findOne(id)
    jugador.lVigente = false
    await this.jugadorRepository.save(jugador)
  }
}
