import { Type } from 'class-transformer'
import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsOptional, IsPositive } from 'class-validator'

export class CreatePartidoDto {
  @IsNotEmpty({ message: 'El ID del deporte es requerido' })
  @IsInt({ message: 'El ID del deporte debe ser un número entero' })
  @IsPositive({ message: 'El ID del deporte debe ser positivo' })
  idDeporte: number

  @IsNotEmpty({ message: 'El ID del equipo local es requerido' })
  @IsInt({ message: 'El ID del equipo local debe ser un número entero' })
  @IsPositive({ message: 'El ID del equipo local debe ser positivo' })
  idEquipoLocal: number

  @IsNotEmpty({ message: 'El ID del equipo visitante es requerido' })
  @IsInt({ message: 'El ID del equipo visitante debe ser un número entero' })
  @IsPositive({ message: 'El ID del equipo visitante debe ser positivo' })
  idEquipoVisitante: number

  @IsNotEmpty({ message: 'La fecha del evento es requerida' })
  @IsDate({ message: 'La fecha del evento debe ser una fecha válida' })
  @Type(() => Date)
  dFechaEvento: Date

  @IsOptional()
  @IsDate({ message: 'La fecha de inicio debe ser una fecha válida' })
  @Type(() => Date)
  dFechaInicio?: Date

  @IsOptional()
  @IsDate({ message: 'La fecha de fin debe ser una fecha válida' })
  @Type(() => Date)
  dFechaFin?: Date

  @IsNotEmpty({ message: 'El ID del estado es requerido' })
  @IsInt({ message: 'El ID del estado debe ser un número entero' })
  @IsPositive({ message: 'El ID del estado debe ser positivo' })
  idEstado: number

  @IsOptional()
  @IsBoolean({ message: 'lVigente debe ser verdadero o falso' })
  lVigente?: boolean
}
