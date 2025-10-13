import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateEstadoPartidoDto {
  @IsNotEmpty({ message: 'El estado es requerido' })
  @IsString({ message: 'El estado debe ser texto' })
  @MaxLength(100, { message: 'El estado no puede exceder 100 caracteres' })
  cEstado: string

  @IsOptional()
  @IsBoolean({ message: 'lVigente debe ser verdadero o falso' })
  lVigente?: boolean
}
