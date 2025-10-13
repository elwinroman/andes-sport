import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateJugadorDto {
  @IsNotEmpty({ message: 'El nombre del jugador es requerido' })
  @IsString({ message: 'El nombre del jugador debe ser texto' })
  @MaxLength(200, { message: 'El nombre del jugador no puede exceder 200 caracteres' })
  cNombreJugador: string

  @IsNotEmpty({ message: 'El apellido del jugador es requerido' })
  @IsString({ message: 'El apellido del jugador debe ser texto' })
  @MaxLength(200, { message: 'El apellido del jugador no puede exceder 200 caracteres' })
  cApellidoJugador: string

  @IsOptional()
  @IsBoolean({ message: 'lVigente debe ser verdadero o falso' })
  lVigente?: boolean
}
