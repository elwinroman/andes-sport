import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Deporte } from './deporte.entity'
import { DetallesFutbol } from './detalles-futbol.entity'
import { DetallesVoley } from './detalles-voley.entity'
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

  @Column({ name: 'dFechaEvento', type: 'datetime2', nullable: true })
  dFechaEvento: Date

  @Column({ name: 'dFechaInicio', type: 'datetime2', nullable: true })
  dFechaInicio: Date

  @Column({ name: 'dFechaFin', type: 'datetime2', nullable: true })
  dFechaFin: Date

  @Column({ name: 'idEstado', nullable: true })
  idEstado: number

  @Column({ name: 'lVigente', type: 'bit', default: 1 })
  lVigente: boolean

  @CreateDateColumn({ name: 'dFechaRegistra', type: 'datetime2' })
  dFechaRegistra: Date

  @Column({ name: 'dFechaModifica', type: 'datetime2', nullable: true })
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

  @OneToOne(() => DetallesFutbol, detalle => detalle.partido)
  detallesFutbol: DetallesFutbol

  @OneToMany(() => DetallesVoley, detalle => detalle.partido)
  detallesVoley: DetallesVoley[]
}
