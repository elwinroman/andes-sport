import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { User } from '../../entities/users.entity'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findByUsername(username)
    if (user && (await bcrypt.compare(pass, user.cPassword))) {
      return user
    }
    return null
  }

  login(user: User) {
    const payload = { username: user.cUsername, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
