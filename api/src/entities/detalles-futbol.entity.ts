import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'

import { Partido } from './partido.entity'

@Entity('DetallesFutbol')
export class DetallesFutbol {
  @PrimaryColumn({ name: 'idPartido' })
  idPartido: number

  @Column({ name: 'nGolesEquipoLocal', type: 'int', nullable: true })
  golesEquipoLocal: number

  @Column({ name: 'nGolesEquipoVisitante', type: 'int', nullable: true })
  golesEquipoVisitante: number

  @OneToOne(() => Partido)
  @JoinColumn({ name: 'idPartido' })
  partido: Partido
}
