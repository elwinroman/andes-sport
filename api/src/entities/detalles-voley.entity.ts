import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

import { Partido } from './partido.entity'

@Entity('DetallesVoley')
export class DetallesVoley {
  @PrimaryColumn({ name: 'idPartido' })
  idPartido: number

  @PrimaryColumn({ name: 'nNumeroSet', type: 'int' })
  numeroSet: number

  @Column({ name: 'nPuntosEquipoLocal', type: 'int', nullable: true })
  puntosEquipoLocal: number

  @Column({ name: 'nPuntosEquipoVisitante', type: 'int', nullable: true })
  puntosEquipoVisitante: number

  @ManyToOne(() => Partido)
  @JoinColumn({ name: 'idPartido' })
  partido: Partido
}
