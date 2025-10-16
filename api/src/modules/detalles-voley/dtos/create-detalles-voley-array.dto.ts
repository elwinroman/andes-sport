import { Type } from 'class-transformer'
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator'

import { CreateDetallesVoleyDto } from './create-detalles-voley.dto'

export class CreateDetallesVoleyArrayDto {
  @IsArray({ message: 'Los sets deben ser un array' })
  @ArrayMinSize(1, { message: 'Debe proporcionar al menos un set' })
  @ValidateNested({ each: true })
  @Type(() => CreateDetallesVoleyDto)
  sets: CreateDetallesVoleyDto[]
}
