import { IsInt, IsOptional, Min } from 'class-validator'

export class UpdateDetallesFutbolDto {
  @IsOptional()
  @IsInt({ message: 'Los goles del equipo local deben ser un número entero' })
  @Min(0, { message: 'Los goles del equipo local no pueden ser negativos' })
  golesEquipoLocal?: number

  @IsOptional()
  @IsInt({ message: 'Los goles del equipo visitante deben ser un número entero' })
  @Min(0, { message: 'Los goles del equipo visitante no pueden ser negativos' })
  golesEquipoVisitante?: number
}
