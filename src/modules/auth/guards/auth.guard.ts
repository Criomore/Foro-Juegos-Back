import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { PUBLIC_KEY } from 'src/constants/keyDecorator'
import { IUseToken } from 'src/interfaces/auth.interface'
import { UsersService } from 'src/modules/users/users.service'
import { useToken } from 'src/utils/auth/use.token'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    )

    if (isPublic) {
      return true
    }

    const req = context.switchToHttp().getRequest<Request>()

    const token = req.headers['user_token']

    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('Token invalido')
    }

    const manageToken: IUseToken | string = useToken(token)

    if (typeof manageToken === 'string') {
      throw new UnauthorizedException(manageToken)
    }

    if (manageToken.isExpired) {
      throw new UnauthorizedException('Token expirado')
    }

    const { sub } = manageToken
    const dataUser = await this.userService.findOne(sub)

    if (!dataUser) {
      throw new UnauthorizedException('Usuario invalido')
    }

    req.idUser = dataUser.data.user.id
    // req.roleUser = dataUser.data.user.role

    return true
  }
}
