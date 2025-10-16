import { IsInt, IsOptional, Min } from 'class-validator'

export class UpdateDetallesVoleyDto {
  @IsOptional()
  @IsInt({ message: 'Los puntos del equipo local deben ser un número entero' })
  @Min(0, { message: 'Los puntos del equipo local no pueden ser negativos' })
  puntosEquipoLocal?: number

  @IsOptional()
  @IsInt({ message: 'Los puntos del equipo visitante deben ser un número entero' })
  @Min(0, { message: 'Los puntos del equipo visitante no pueden ser negativos' })
  puntosEquipoVisitante?: number
}
