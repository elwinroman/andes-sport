import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'

import { Partido } from './partido.entity'

@Entity('DetallesVoley')
export class DetallesVoley {
  @PrimaryColumn({ name: 'idPartido' })
  idPartido: number

  @Column({ name: 'nSetsEquipoLocal', type: 'int', nullable: true })
  setsEquipoLocal: number

  @Column({ name: 'nSetsEquipoVisitante', type: 'int', nullable: true })
  setsEquipoVisitante: number

  @Column({ name: 'nPuntosEquipoLocal', type: 'int', nullable: true })
  puntosEquipoLocal: number

  @Column({ name: 'nPuntosEquipoVisitante', type: 'int', nullable: true })
  puntosEquipoVisitante: number

  @OneToOne(() => Partido)
  @JoinColumn({ name: 'idPartido' })
  partido: Partido
}
