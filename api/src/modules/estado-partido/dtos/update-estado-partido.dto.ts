import { PartialType } from '@nestjs/mapped-types'

import { CreateEstadoPartidoDto } from './create-estado-partido.dto'

export class UpdateEstadoPartidoDto extends PartialType(CreateEstadoPartidoDto) {}
