import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AuthGuard } from '../auth/guards/auth.guard'
import { PublicAccess } from '../auth/decorators/public.decorator'

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //user
  @PublicAccess()
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  //admin
  @Get('all')
  findAll() {
    return this.usersService.findAll()
  }

  //public
  @PublicAccess()
  @Get('id/:userId')
  findOne(@Param('userId') userId: string) {
    return this.usersService.findOne(userId)
  }

  //admin
  @Get('actives')
  findActiveUsers() {
    return this.usersService.findActiveUsers()
  }

  //admin
  @Get('banned')
  findBaneedUsers() {
    return this.usersService.findBannedUsers()
  }

  //admin
  @Patch('ban/:userId')
  banUser(@Param('userId') userId: string, @Body() reason: string[]) {
    return this.usersService.banUser(userId, reason)
  }

  //admin
  @Patch('unban/:userId')
  unBanUser(@Param('userId') userId: string) {
    return this.usersService.unBanUser(userId)
  }

  //user
  @Patch('update/:userId')
  update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.log(userId)
    return this.usersService.update(userId, updateUserDto)
  }

  //admin
  @Delete('delete/:userId')
  remove(@Param('userId') id: string) {
    return this.usersService.remove(id)
  }
}
