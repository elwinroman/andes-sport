import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateEquipoDto {
  @IsNotEmpty({ message: 'El nombre del equipo es requerido' })
  @IsString({ message: 'El nombre del equipo debe ser texto' })
  @MaxLength(200, { message: 'El nombre del equipo no puede exceder 200 caracteres' })
  cEquipo: string

  @IsOptional()
  @IsString({ message: 'El detalle debe ser texto' })
  @MaxLength(200, { message: 'El detalle no puede exceder 200 caracteres' })
  cDetalle?: string

  @IsOptional()
  @IsBoolean({ message: 'lVigente debe ser verdadero o falso' })
  lVigente?: boolean
}
