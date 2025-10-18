import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'

import { EquipoJugador } from '../../entities/equipo-jugador.entity'
import { Jugador } from '../../entities/jugador.entity'
import { getCurrentUTCDate } from '../../utils/date.util'
import { CreateJugadorDto } from './dtos/create-jugador.dto'
import { CreateJugadorConEquipoDto } from './dtos/create-jugador-con-equipo.dto'
import { UpdateJugadorDto } from './dtos/update-jugador.dto'
import { UpdateJugadorConEquipoDto } from './dtos/update-jugador-con-equipo.dto'

@Injectable()
export class JugadorService {
  constructor(
    @InjectRepository(Jugador)
    private readonly jugadorRepository: Repository<Jugador>,
    @InjectRepository(EquipoJugador)
    private readonly equipoJugadorRepository: Repository<EquipoJugador>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createJugadorDto: CreateJugadorDto): Promise<Jugador> {
    const jugador = this.jugadorRepository.create(createJugadorDto)
    return await this.jugadorRepository.save(jugador)
  }

  async findAll(idEquipo?: number): Promise<Jugador[]> {
    if (idEquipo !== undefined) {
      return await this.findByEquipo(idEquipo)
    }

    return await this.jugadorRepository.find({
      where: { lVigente: true },
      order: { dFechaRegistra: 'DESC' },
    })
  }

  async findByEquipo(idEquipo: number): Promise<Jugador[]> {
    const jugadores = await this.jugadorRepository
      .createQueryBuilder('jugador')
      .innerJoin('jugador.equipoJugadores', 'equipoJugador', 'equipoJugador.lVigente = :vigente', { vigente: true })
      .where('jugador.lVigente = :vigente', { vigente: true })
      .andWhere('equipoJugador.idEquipo = :idEquipo', { idEquipo })
      .orderBy('jugador.cApellidoJugador', 'ASC')
      .addOrderBy('jugador.cNombreJugador', 'ASC')
      .getMany()

    return jugadores
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
    jugador.dFechaModifica = getCurrentUTCDate()

    Object.assign(jugador, updateJugadorDto)
    return await this.jugadorRepository.save(jugador)
  }

  async remove(id: number): Promise<void> {
    const jugador = await this.findOne(id)
    jugador.lVigente = false
    await this.jugadorRepository.save(jugador)
  }

  async findSinEquipo(): Promise<Jugador[]> {
    // Usar una subconsulta para obtener jugadores sin equipo activo
    const jugadoresSinEquipo = await this.jugadorRepository
      .createQueryBuilder('jugador')
      .leftJoin('jugador.equipoJugadores', 'equipoJugador', 'equipoJugador.lVigente = :vigente', { vigente: true })
      .where('jugador.lVigente = :vigente', { vigente: true })
      .andWhere('equipoJugador.idJugador IS NULL')
      .orderBy('jugador.cApellidoJugador', 'ASC')
      .addOrderBy('jugador.cNombreJugador', 'ASC')
      .getMany()

    return jugadoresSinEquipo
  }

  async createConEquipo(createJugadorConEquipoDto: CreateJugadorConEquipoDto): Promise<Jugador> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      // Crear el jugador
      const jugador = this.jugadorRepository.create({
        cNombreJugador: createJugadorConEquipoDto.cNombreJugador,
        cApellidoJugador: createJugadorConEquipoDto.cApellidoJugador,
        lVigente: createJugadorConEquipoDto.lVigente ?? true,
      })
      const jugadorGuardado = await queryRunner.manager.save(jugador)

      // Crear la relación equipo-jugador
      const equipoJugador = this.equipoJugadorRepository.create({
        idEquipo: createJugadorConEquipoDto.idEquipo,
        idJugador: jugadorGuardado.idJugador,
        lVigente: true,
      })
      await queryRunner.manager.save(equipoJugador)

      await queryRunner.commitTransaction()

      // Retornar el jugador con la relación cargada
      const jugadorConRelaciones = await this.jugadorRepository.findOne({
        where: { idJugador: jugadorGuardado.idJugador },
        relations: ['equipoJugadores'],
      })

      if (!jugadorConRelaciones) {
        throw new NotFoundException(`Jugador con ID ${jugadorGuardado.idJugador} no encontrado`)
      }

      return jugadorConRelaciones
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }

  async updateConEquipo(id: number, updateJugadorConEquipoDto: UpdateJugadorConEquipoDto): Promise<Jugador> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      // Verificar que el jugador existe
      const jugador = await this.findOne(id)
      jugador.dFechaModifica = getCurrentUTCDate()

      // Actualizar datos del jugador si se proporcionan
      if (updateJugadorConEquipoDto.cNombreJugador !== undefined) {
        jugador.cNombreJugador = updateJugadorConEquipoDto.cNombreJugador
      }
      if (updateJugadorConEquipoDto.cApellidoJugador !== undefined) {
        jugador.cApellidoJugador = updateJugadorConEquipoDto.cApellidoJugador
      }
      if (updateJugadorConEquipoDto.lVigente !== undefined) {
        jugador.lVigente = updateJugadorConEquipoDto.lVigente
      }

      await queryRunner.manager.save(jugador)

      // Si se proporciona un nuevo equipo, actualizar la relación
      if (updateJugadorConEquipoDto.idEquipo !== undefined) {
        // Desactivar relaciones anteriores
        await queryRunner.manager.update(
          EquipoJugador,
          { idJugador: id, lVigente: true },
          { lVigente: false, dFechaModifica: getCurrentUTCDate() },
        )

        // Verificar si ya existe una relación con el nuevo equipo
        const relacionExistente = await queryRunner.manager.findOne(EquipoJugador, {
          where: {
            idEquipo: updateJugadorConEquipoDto.idEquipo,
            idJugador: id,
          },
        })

        if (relacionExistente) {
          // Reactivar la relación existente
          relacionExistente.lVigente = true
          relacionExistente.dFechaModifica = getCurrentUTCDate()
          await queryRunner.manager.save(relacionExistente)
        } else {
          // Crear nueva relación
          const nuevaRelacion = this.equipoJugadorRepository.create({
            idEquipo: updateJugadorConEquipoDto.idEquipo,
            idJugador: id,
            lVigente: true,
          })
          await queryRunner.manager.save(nuevaRelacion)
        }
      }

      await queryRunner.commitTransaction()

      // Retornar el jugador actualizado con sus relaciones
      const jugadorActualizado = await this.jugadorRepository.findOne({
        where: { idJugador: id },
        relations: ['equipoJugadores', 'equipoJugadores.equipo'],
      })

      if (!jugadorActualizado) {
        throw new NotFoundException(`Jugador con ID ${id} no encontrado`)
      }

      return jugadorActualizado
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }
}
