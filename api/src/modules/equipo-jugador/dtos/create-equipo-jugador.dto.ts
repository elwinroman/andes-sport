import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsPositive } from 'class-validator'

export class CreateEquipoJugadorDto {
  @IsNotEmpty({ message: 'El ID del equipo es requerido' })
  @IsInt({ message: 'El ID del equipo debe ser un número entero' })
  @IsPositive({ message: 'El ID del equipo debe ser positivo' })
  idEquipo: number

  @IsNotEmpty({ message: 'El ID del jugador es requerido' })
  @IsInt({ message: 'El ID del jugador debe ser un número entero' })
  @IsPositive({ message: 'El ID del jugador debe ser positivo' })
  idJugador: number

  @IsOptional()
  @IsBoolean({ message: 'lVigente debe ser verdadero o falso' })
  lVigente?: boolean
}
