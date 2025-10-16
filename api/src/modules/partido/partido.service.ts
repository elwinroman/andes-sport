import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ClasificacionEquipoDto, ClasificacionResponseDto } from '../../dto/clasificacion.dto'
import { DetallesFutbol } from '../../entities/detalles-futbol.entity'
import { DetallesVoley } from '../../entities/detalles-voley.entity'
import { Partido } from '../../entities/partido.entity'
import { getCurrentUTCDate } from '../../utils/date.util'
import { CreatePartidoDto } from './dtos/create-partido.dto'
import { UpdatePartidoDto } from './dtos/update-partido.dto'

@Injectable()
export class PartidoService {
  constructor(
    @InjectRepository(Partido)
    private readonly partidoRepository: Repository<Partido>,
    @InjectRepository(DetallesFutbol)
    private readonly detallesFutbolRepository: Repository<DetallesFutbol>,
    @InjectRepository(DetallesVoley)
    private readonly detallesVoleyRepository: Repository<DetallesVoley>,
  ) {}

  async create(createPartidoDto: CreatePartidoDto): Promise<Partido> {
    const partido = this.partidoRepository.create(createPartidoDto)
    return await this.partidoRepository.save(partido)
  }

  async createMany(createPartidosDtos: CreatePartidoDto[]): Promise<Partido[]> {
    const partidos = this.partidoRepository.create(createPartidosDtos)
    return await this.partidoRepository.save(partidos)
  }

  async findAll(): Promise<Partido[]> {
    return await this.partidoRepository.find({
      where: { lVigente: true },
      relations: ['equipoLocal', 'equipoVisitante'],
      order: { dFechaEvento: 'ASC' },
    })
  }

  async findOne(id: number): Promise<Partido> {
    const partido = await this.partidoRepository.findOne({
      where: { idPartido: id, lVigente: true },
      relations: ['deporte', 'equipoLocal', 'equipoVisitante', 'estado'],
    })

    if (!partido) {
      throw new NotFoundException(`Partido con ID ${id} no encontrado`)
    }

    return partido
  }

  async update(id: number, updatePartidoDto: UpdatePartidoDto): Promise<Partido> {
    // Cargar partido SIN relaciones para evitar conflictos con foreign keys
    const partido = await this.partidoRepository.findOne({
      where: { idPartido: id, lVigente: true },
    })

    if (!partido) {
      throw new NotFoundException(`Partido con ID ${id} no encontrado`)
    }

    partido.dFechaModifica = getCurrentUTCDate()
    Object.assign(partido, updatePartidoDto)

    const partidoGuardado = await this.partidoRepository.save(partido)

    return partidoGuardado
  }

  async remove(id: number): Promise<void> {
    const partido = await this.findOne(id)
    partido.lVigente = false
    await this.partidoRepository.save(partido)
  }

  async getClasificacionByDeporte(idDeporte: number): Promise<ClasificacionResponseDto> {
    // Obtener todos los partidos finalizados del deporte
    const partidos = await this.partidoRepository.find({
      where: {
        idDeporte,
        lVigente: true,
        idEstado: 3, // Asumiendo que 3 es "Finalizado"
      },
      relations: ['equipoLocal', 'equipoVisitante', 'deporte'],
    })

    if (partidos.length === 0) {
      throw new NotFoundException(`No hay partidos finalizados para el deporte con ID ${idDeporte}`)
    }

    // Obtener detalles según el tipo de deporte
    const deporteNombre = partidos[0]?.deporte?.cDeporte || 'Desconocido'
    const esDeporteFutbol = deporteNombre.toLowerCase().includes('futbol') || deporteNombre.toLowerCase().includes('fútbol')

    // Crear mapa de equipos para acumular estadísticas
    const equiposMap = new Map<number, ClasificacionEquipoDto>()

    // Procesar cada partido
    for (const partido of partidos) {
      // Inicializar equipos si no existen
      if (!equiposMap.has(partido.idEquipoLocal)) {
        equiposMap.set(partido.idEquipoLocal, {
          idEquipo: partido.idEquipoLocal,
          nombreEquipo: partido.equipoLocal?.cEquipo || 'Desconocido',
          partidosJugados: 0,
          partidosGanados: 0,
          partidosPerdidos: 0,
          partidosEmpatados: 0,
          golesFavor: 0,
          golesContra: 0,
          diferenciaGoles: 0,
          puntos: 0,
          posicion: 0,
        })
      }

      if (!equiposMap.has(partido.idEquipoVisitante)) {
        equiposMap.set(partido.idEquipoVisitante, {
          idEquipo: partido.idEquipoVisitante,
          nombreEquipo: partido.equipoVisitante?.cEquipo || 'Desconocido',
          partidosJugados: 0,
          partidosGanados: 0,
          partidosPerdidos: 0,
          partidosEmpatados: 0,
          golesFavor: 0,
          golesContra: 0,
          diferenciaGoles: 0,
          puntos: 0,
          posicion: 0,
        })
      }

      const equipoLocal = equiposMap.get(partido.idEquipoLocal)
      const equipoVisitante = equiposMap.get(partido.idEquipoVisitante)

      if (!equipoLocal || !equipoVisitante) {
        continue
      }

      // Obtener resultados según el deporte
      let golesLocal = 0
      let golesVisitante = 0

      if (esDeporteFutbol) {
        const detalle = await this.detallesFutbolRepository.findOne({
          where: { idPartido: partido.idPartido },
        })
        golesLocal = detalle?.golesEquipoLocal || 0
        golesVisitante = detalle?.golesEquipoVisitante || 0
      } else {
        // Para voley, contar sets ganados por cada equipo
        const detallesVoley = await this.detallesVoleyRepository.find({
          where: { idPartido: partido.idPartido },
        })

        let setsLocal = 0
        let setsVisitante = 0

        for (const set of detallesVoley) {
          if (set.puntosEquipoLocal > set.puntosEquipoVisitante) {
            setsLocal++
          } else if (set.puntosEquipoVisitante > set.puntosEquipoLocal) {
            setsVisitante++
          }
        }

        golesLocal = setsLocal
        golesVisitante = setsVisitante
      }

      // Actualizar estadísticas
      equipoLocal.partidosJugados++
      equipoVisitante.partidosJugados++
      equipoLocal.golesFavor += golesLocal
      equipoLocal.golesContra += golesVisitante
      equipoVisitante.golesFavor += golesVisitante
      equipoVisitante.golesContra += golesLocal

      // Determinar resultado
      if (golesLocal > golesVisitante) {
        equipoLocal.partidosGanados++
        equipoLocal.puntos += 3
        equipoVisitante.partidosPerdidos++
      } else if (golesVisitante > golesLocal) {
        equipoVisitante.partidosGanados++
        equipoVisitante.puntos += 3
        equipoLocal.partidosPerdidos++
      } else {
        equipoLocal.partidosEmpatados++
        equipoVisitante.partidosEmpatados++
        equipoLocal.puntos += 1
        equipoVisitante.puntos += 1
      }

      // Actualizar diferencia de goles
      equipoLocal.diferenciaGoles = equipoLocal.golesFavor - equipoLocal.golesContra
      equipoVisitante.diferenciaGoles = equipoVisitante.golesFavor - equipoVisitante.golesContra
    }

    // Convertir mapa a array y ordenar
    const equipos = Array.from(equiposMap.values()).sort((a, b) => {
      // Ordenar por puntos, luego diferencia de goles, luego goles a favor
      if (b.puntos !== a.puntos) return b.puntos - a.puntos
      if (b.diferenciaGoles !== a.diferenciaGoles) return b.diferenciaGoles - a.diferenciaGoles
      return b.golesFavor - a.golesFavor
    })

    // Asignar posiciones
    equipos.forEach((equipo, index) => {
      equipo.posicion = index + 1
    })

    return {
      deporte: deporteNombre,
      equipos,
      ultimaActualizacion: getCurrentUTCDate(),
    }
  }
}
