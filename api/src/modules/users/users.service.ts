import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import bcrypt from 'bcrypt'
import { Repository } from 'typeorm'

import { User } from '../../entities/users.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findByUsername(cUsername: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { cUsername } })
  }

  async createUser(cUsername: string, cPassword: string): Promise<User> {
    const hash = await bcrypt.hash(cPassword, 10)
    const user = this.usersRepository.create({ cUsername, cPassword: hash })
    return this.usersRepository.save(user)
  }
}
