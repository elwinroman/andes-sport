import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

import { Equipo } from './equipo.entity'
import { Jugador } from './jugador.entity'

@Entity('EquipoJugador')
export class EquipoJugador {
  @PrimaryColumn({ name: 'idEquipo' })
  idEquipo: number

  @PrimaryColumn({ name: 'idJugador' })
  idJugador: number

  @Column({ name: 'lVigente', type: 'bit', default: 1 })
  lVigente: boolean

  @CreateDateColumn({ name: 'dFechaRegistra', type: 'datetime' })
  dFechaRegistra: Date

  @Column({ name: 'dFechaModifica', type: 'datetime', nullable: true })
  dFechaModifica: Date

  @ManyToOne(() => Equipo, equipo => equipo.equipoJugadores)
  @JoinColumn({ name: 'idEquipo' })
  equipo: Equipo

  @ManyToOne(() => Jugador, jugador => jugador.equipoJugadores)
  @JoinColumn({ name: 'idJugador' })
  jugador: Jugador
}
