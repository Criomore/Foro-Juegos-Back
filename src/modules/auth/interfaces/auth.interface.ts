export interface PayloadToken {
  sub: string
  //role
}

export interface AuthBody {
  username: string
  password: string
}

export interface AuthTokenResult {
  sub: string
  //role
  ait: number
  exp: number
}

export interface IUseToken {
  sub: string
  //role
  isExpired: boolean
}
