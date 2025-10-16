import { IsInt, IsNotEmpty, IsPositive, Min } from 'class-validator'

export class CreateDetallesVoleyDto {
  @IsNotEmpty({ message: 'El ID del partido es requerido' })
  @IsInt({ message: 'El ID del partido debe ser un número entero' })
  @IsPositive({ message: 'El ID del partido debe ser positivo' })
  idPartido: number

  @IsNotEmpty({ message: 'El número de set es requerido' })
  @IsInt({ message: 'El número de set debe ser un número entero' })
  @IsPositive({ message: 'El número de set debe ser positivo' })
  numeroSet: number

  @IsNotEmpty({ message: 'Los puntos del equipo local son requeridos' })
  @IsInt({ message: 'Los puntos del equipo local deben ser un número entero' })
  @Min(0, { message: 'Los puntos del equipo local no pueden ser negativos' })
  puntosEquipoLocal: number

  @IsNotEmpty({ message: 'Los puntos del equipo visitante son requeridos' })
  @IsInt({ message: 'Los puntos del equipo visitante deben ser un número entero' })
  @Min(0, { message: 'Los puntos del equipo visitante no pueden ser negativos' })
  puntosEquipoVisitante: number
}
