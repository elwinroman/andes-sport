import { IsInt, IsNotEmpty, IsOptional, IsPositive, Min } from 'class-validator'

export class CreateDetallesFutbolDto {
  @IsNotEmpty({ message: 'El ID del partido es requerido' })
  @IsInt({ message: 'El ID del partido debe ser un número entero' })
  @IsPositive({ message: 'El ID del partido debe ser positivo' })
  idPartido: number

  @IsOptional()
  @IsInt({ message: 'Los goles del equipo local deben ser un número entero' })
  @Min(0, { message: 'Los goles del equipo local no pueden ser negativos' })
  golesEquipoLocal?: number

  @IsOptional()
  @IsInt({ message: 'Los goles del equipo visitante deben ser un número entero' })
  @Min(0, { message: 'Los goles del equipo visitante no pueden ser negativos' })
  golesEquipoVisitante?: number
}
