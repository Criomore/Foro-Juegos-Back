import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthBody } from './interfaces/auth.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  @Post('login')
  async login(@Body() {username, password}: AuthBody){
    const userValidate = await this.authService.validateUser(username, password)

    if(!userValidate){
      throw new UnauthorizedException('Los datos no son válidos')
    }

    const jwt = await this.authService.generateJWT(userValidate)

    return jwt  
  }
}
