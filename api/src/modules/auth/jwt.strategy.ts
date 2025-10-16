import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'mi_secreto_super_seguro',
    })
  }

  validate(payload: JwtPayload) {
    // Here you can add additional validation or fetch user from DB if needed
    return { userId: payload.sub, username: payload.username }
  }
}

// Define JwtPayload interface
interface JwtPayload {
  sub: number
  username: string
  // add other properties if needed
}
