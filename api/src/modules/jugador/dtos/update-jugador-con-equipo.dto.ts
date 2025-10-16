import { IsBoolean, IsInt, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator'

export class UpdateJugadorConEquipoDto {
  @IsOptional()
  @IsString({ message: 'El nombre del jugador debe ser texto' })
  @MaxLength(200, { message: 'El nombre del jugador no puede exceder 200 caracteres' })
  cNombreJugador?: string

  @IsOptional()
  @IsString({ message: 'El apellido del jugador debe ser texto' })
  @MaxLength(200, { message: 'El apellido del jugador no puede exceder 200 caracteres' })
  cApellidoJugador?: string

  @IsOptional()
  @IsInt({ message: 'El ID del equipo debe ser un número entero' })
  @IsPositive({ message: 'El ID del equipo debe ser positivo' })
  idEquipo?: number

  @IsOptional()
  @IsBoolean({ message: 'lVigente debe ser verdadero o falso' })
  lVigente?: boolean
}
