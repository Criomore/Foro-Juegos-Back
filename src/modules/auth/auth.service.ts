import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService
  ){}

  public async validateUser(username: string, password: string){
    const userByUserName = await this.userService.findBy({
      key: 'userName',
      value: username
    })
    const userByEmail = await this.userService.findBy({
      key: 'email',
      value: username
    })

    // minuto 30 jeje quedo en el if xd chao
  }
}
