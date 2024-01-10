import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { User } from '../users/entities/user.entity'
import { PayloadToken } from './interfaces/auth.interface'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(username: string, password: string) {
    const userByUserName = await this.userService.findBy({
      key: 'userName',
      value: username,
    })
    const userByEmail = await this.userService.findBy({
      key: 'email',
      value: username,
    })

    if (userByUserName) {
      const match = await bcrypt.compare(password, userByUserName.password)
      if (match) return userByUserName
    }

    if (userByEmail) {
      const match = await bcrypt.compare(password, userByEmail.password)
      if (match) return userByEmail
    }

    return null
  }

  async signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload
    secret: string
    expires: string | number
  }) {
    return jwt.sign(payload, secret, { expiresIn: expires })
  }

  async generateJWT(user: User): Promise<any> {
    const getUser = await this.userService.findOne(user.id)

    const payload: PayloadToken = {
      sub: getUser.data.user.id,
    }

    return {
      accessToken: this.signJWT({
        payload,
        secret: process.env.JWT_SECRET,
        expires: '1h',
      }),
      user,
    }
  }
}
