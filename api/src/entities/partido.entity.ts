import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Deporte } from './deporte.entity'
import { Equipo } from './equipo.entity'
import { EstadoPartido } from './estado-partido.entity'

@Entity('Partidos')
export class Partido {
  @PrimaryGeneratedColumn({ name: 'idPartido' })
  idPartido: number

  @Column({ name: 'idDeporte', nullable: true })
  idDeporte: number

  @Column({ name: 'idEquipoLocal', nullable: true })
  idEquipoLocal: number

  @Column({ name: 'idEquipoVisitante', nullable: true })
  idEquipoVisitante: number

  @Column({ name: 'dFechaEvento', type: 'datetime', nullable: true })
  dFechaEvento: Date

  @Column({ name: 'idEstado', nullable: true })
  idEstado: number

  @Column({ name: 'lVigente', type: 'bit', default: 1 })
  lVigente: boolean

  @CreateDateColumn({ name: 'dFechaRegistra', type: 'datetime' })
  dFechaRegistra: Date

  @Column({ name: 'dFechaModifica', type: 'datetime', nullable: true })
  dFechaModifica: Date

  @ManyToOne(() => Deporte, deporte => deporte.partidos)
  @JoinColumn({ name: 'idDeporte' })
  deporte: Deporte

  @ManyToOne(() => Equipo, equipo => equipo.partidosLocal)
  @JoinColumn({ name: 'idEquipoLocal' })
  equipoLocal: Equipo

  @ManyToOne(() => Equipo, equipo => equipo.partidosVisitante)
  @JoinColumn({ name: 'idEquipoVisitante' })
  equipoVisitante: Equipo

  @ManyToOne(() => EstadoPartido, estado => estado.partidos)
  @JoinColumn({ name: 'idEstado' })
  estado: EstadoPartido
}
