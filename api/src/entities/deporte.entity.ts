import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Partido } from './partido.entity'

@Entity('Deporte')
export class Deporte {
  @PrimaryGeneratedColumn({ name: 'idDeporte' })
  idDeporte: number

  @Column({ name: 'cDeporte', type: 'varchar', length: 200 })
  cDeporte: string

  @Column({ name: 'cDetalles', type: 'varchar', length: 200, nullable: true })
  cDetalles: string

  @Column({ name: 'lVigente', type: 'bit', default: 1 })
  lVigente: boolean

  @CreateDateColumn({ name: 'dFechaRegistra', type: 'datetime' })
  dFechaRegistra: Date

  @Column({ name: 'dFechaModifica', type: 'datetime', nullable: true })
  dFechaModifica: Date

  @OneToMany(() => Partido, partido => partido.deporte)
  partidos: Partido[]
}
