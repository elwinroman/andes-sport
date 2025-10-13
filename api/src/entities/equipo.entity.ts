import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { EquipoJugador } from './equipo-jugador.entity'
import { Partido } from './partido.entity'

@Entity('Equipo')
export class Equipo {
  @PrimaryGeneratedColumn({ name: 'idEquipo' })
  idEquipo: number

  @Column({ name: 'cEquipo', type: 'varchar', length: 200 })
  cEquipo: string

  @Column({ name: 'cDetalle', type: 'varchar', length: 200, nullable: true })
  cDetalle: string

  @Column({ name: 'lVigente', type: 'bit', default: 1 })
  lVigente: boolean

  @CreateDateColumn({ name: 'dFechaRegistra', type: 'datetime' })
  dFechaRegistra: Date

  @Column({ name: 'dFechaModifica', type: 'datetime', nullable: true })
  dFechaModifica: Date

  @OneToMany(() => EquipoJugador, equipoJugador => equipoJugador.equipo)
  equipoJugadores: EquipoJugador[]

  @OneToMany(() => Partido, partido => partido.equipoLocal)
  partidosLocal: Partido[]

  @OneToMany(() => Partido, partido => partido.equipoVisitante)
  partidosVisitante: Partido[]
}
