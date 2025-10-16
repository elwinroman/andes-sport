import { Type } from 'class-transformer'
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator'

import { CreatePartidoDto } from './create-partido.dto'

export class CreatePartidosArrayDto {
  @IsArray({ message: 'Debe ser un array de partidos' })
  @ArrayMinSize(1, { message: 'Debe haber al menos un partido en el array' })
  @ValidateNested({ each: true })
  @Type(() => CreatePartidoDto)
  partidos: CreatePartidoDto[]
}
