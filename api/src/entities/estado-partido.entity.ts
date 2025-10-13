import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Partido } from './partido.entity'

@Entity('EstadoPartido')
export class EstadoPartido {
  @PrimaryGeneratedColumn({ name: 'idEstado' })
  idEstado: number

  @Column({ name: 'cEstado', type: 'varchar', length: 100 })
  cEstado: string

  @Column({ name: 'lVigente', type: 'bit', default: 1 })
  lVigente: boolean

  @CreateDateColumn({ name: 'dFechaRegistra', type: 'datetime' })
  dFechaRegistra: Date

  @Column({ name: 'dFechaModifica', type: 'datetime', nullable: true })
  dFechaModifica: Date

  @OneToMany(() => Partido, partido => partido.estado)
  partidos: Partido[]
}
