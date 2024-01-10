import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  @Post('login')
  async login(@Body() {username, password}: AuthDTO){
    const userValidate = await this.authService.validateUser(username, password)

    if(!userValidate){
      throw new UnauthorizedException('Los datos no son válidos')
    }

    const jwt = await this.authService.generateJWT(userValidate)

    return jwt  
  }
}
