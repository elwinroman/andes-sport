import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { EquipoJugador } from '../../entities/equipo-jugador.entity'
import { getCurrentUTCDate } from '../../utils/date.util'
import { CreateEquipoJugadorDto } from './dtos/create-equipo-jugador.dto'
import { UpdateEquipoJugadorDto } from './dtos/update-equipo-jugador.dto'

@Injectable()
export class EquipoJugadorService {
  constructor(
    @InjectRepository(EquipoJugador)
    private readonly equipoJugadorRepository: Repository<EquipoJugador>,
  ) {}

  async create(createEquipoJugadorDto: CreateEquipoJugadorDto): Promise<EquipoJugador> {
    const { idEquipo, idJugador } = createEquipoJugadorDto

    // Paso 1: Desactivar todas las relaciones activas del jugador con otros equipos
    const relacionesActivasOtrosEquipos = await this.equipoJugadorRepository.find({
      where: { idJugador, lVigente: true },
    })

    if (relacionesActivasOtrosEquipos.length > 0) {
      const fechaActual = getCurrentUTCDate()
      for (const relacion of relacionesActivasOtrosEquipos) {
        // Solo desactivar si es un equipo diferente
        if (relacion.idEquipo !== idEquipo) {
          relacion.lVigente = false
          relacion.dFechaModifica = fechaActual
        }
      }
      await this.equipoJugadorRepository.save(relacionesActivasOtrosEquipos)
    }

    // Paso 2: Verificar si ya existe una relación con el equipo destino
    const relacionConEquipoDestino = await this.equipoJugadorRepository.findOne({
      where: { idEquipo, idJugador },
      relations: ['equipo', 'jugador'],
    })

    if (relacionConEquipoDestino) {
      // Si existe pero está inactiva, reactivarla
      if (!relacionConEquipoDestino.lVigente) {
        relacionConEquipoDestino.lVigente = true
        relacionConEquipoDestino.dFechaModifica = getCurrentUTCDate()
        return await this.equipoJugadorRepository.save(relacionConEquipoDestino)
      }
      // Si ya está activa, retornarla
      return relacionConEquipoDestino
    }

    // Paso 3: Si no existe, crear una nueva relación
    const nuevaRelacion = this.equipoJugadorRepository.create(createEquipoJugadorDto)
    await this.equipoJugadorRepository.save(nuevaRelacion)

    // Retornar con relaciones cargadas
    const relacionCreada = await this.equipoJugadorRepository.findOne({
      where: { idEquipo, idJugador },
      relations: ['equipo', 'jugador'],
    })

    if (!relacionCreada) {
      throw new NotFoundException(`No se pudo crear la relación Equipo-Jugador`)
    }

    return relacionCreada
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
    equipoJugador.dFechaModifica = getCurrentUTCDate()

    Object.assign(equipoJugador, updateEquipoJugadorDto)
    return await this.equipoJugadorRepository.save(equipoJugador)
  }

  async remove(idEquipo: number, idJugador: number): Promise<void> {
    const equipoJugador = await this.findOne(idEquipo, idJugador)
    equipoJugador.lVigente = false
    await this.equipoJugadorRepository.save(equipoJugador)
  }
}
