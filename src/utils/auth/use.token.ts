
import * as jwt from 'jsonwebtoken'
import { AuthTokenResult, IUseToken } from 'src/interfaces/auth.interface'

export const useToken = (token: string): IUseToken | string => {
  try {
    const decode = jwt.decode(token) as AuthTokenResult

    const currentDate = new Date()
    const expiresDate = new Date(decode.exp)

    return {
      sub: decode.sub,
      //role,
      isExpired: +expiresDate <= +currentDate / 1000,
    }
  } catch (error) {
    return 'Token invalido'
  }
}
