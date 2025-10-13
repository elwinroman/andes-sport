import { IsInt, IsNotEmpty, IsOptional, IsPositive, Min } from 'class-validator'

export class CreateDetallesVoleyDto {
  @IsNotEmpty({ message: 'El ID del partido es requerido' })
  @IsInt({ message: 'El ID del partido debe ser un número entero' })
  @IsPositive({ message: 'El ID del partido debe ser positivo' })
  idPartido: number

  @IsOptional()
  @IsInt({ message: 'Los sets del equipo local deben ser un número entero' })
  @Min(0, { message: 'Los sets del equipo local no pueden ser negativos' })
  setsEquipoLocal?: number

  @IsOptional()
  @IsInt({ message: 'Los sets del equipo visitante deben ser un número entero' })
  @Min(0, { message: 'Los sets del equipo visitante no pueden ser negativos' })
  setsEquipoVisitante?: number

  @IsOptional()
  @IsInt({ message: 'Los puntos del equipo local deben ser un número entero' })
  @Min(0, { message: 'Los puntos del equipo local no pueden ser negativos' })
  puntosEquipoLocal?: number

  @IsOptional()
  @IsInt({ message: 'Los puntos del equipo visitante deben ser un número entero' })
  @Min(0, { message: 'Los puntos del equipo visitante no pueden ser negativos' })
  puntosEquipoVisitante?: number
}
