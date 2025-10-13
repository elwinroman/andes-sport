import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { EquipoJugador } from './equipo-jugador.entity'

@Entity('Jugador')
export class Jugador {
  @PrimaryGeneratedColumn({ name: 'idJugador' })
  idJugador: number

  @Column({ name: 'cNombreJugador', type: 'varchar', length: 200 })
  cNombreJugador: string

  @Column({ name: 'cApellidoJugador', type: 'varchar', length: 200 })
  cApellidoJugador: string

  @Column({ name: 'lVigente', type: 'bit', default: 1 })
  lVigente: boolean

  @CreateDateColumn({ name: 'dFechaRegistra', type: 'datetime' })
  dFechaRegistra: Date

  @Column({ name: 'dFechaModifica', type: 'datetime', nullable: true })
  dFechaModifica: Date

  @OneToMany(() => EquipoJugador, equipoJugador => equipoJugador.jugador)
  equipoJugadores: EquipoJugador[]
}
