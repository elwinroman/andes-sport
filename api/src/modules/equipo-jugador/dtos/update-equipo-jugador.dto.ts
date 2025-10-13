import { IsBoolean, IsOptional } from 'class-validator'

export class UpdateEquipoJugadorDto {
  @IsOptional()
  @IsBoolean({ message: 'lVigente debe ser verdadero o falso' })
  lVigente?: boolean
}
