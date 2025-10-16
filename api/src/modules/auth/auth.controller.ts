import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'

import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './jwt-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    const user = await this.usersService.createUser(body.username, body.password)
    return { message: 'Usuario creado', user }
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(body.username, body.password)
    if (!user) throw new Error('Credenciales inválidas')
    return this.authService.login(user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: { id: number; username: string } }) {
    return req.user
  }
}
