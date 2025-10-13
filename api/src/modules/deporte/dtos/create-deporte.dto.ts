import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateDeporteDto {
  @IsNotEmpty({ message: 'El nombre del deporte es requerido' })
  @IsString({ message: 'El nombre del deporte debe ser texto' })
  @MaxLength(200, { message: 'El nombre del deporte no puede exceder 200 caracteres' })
  cDeporte: string

  @IsOptional()
  @IsString({ message: 'Los detalles deben ser texto' })
  @MaxLength(200, { message: 'Los detalles no pueden exceder 200 caracteres' })
  cDetalles?: string

  @IsOptional()
  @IsBoolean({ message: 'lVigente debe ser verdadero o falso' })
  lVigente?: boolean
}
