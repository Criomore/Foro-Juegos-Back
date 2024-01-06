import { HttpException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { STATE } from 'src/constants/state.enum'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.save(createUserDto)

      return {
        status: 'success',
        data: { user, message: 'Se creo correctamente el usuario' },
      }
    } catch (error) {
      throw new HttpException(error.driverError.detail, 400)
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find()
      const count = await this.userRepository.count()
      const actives = await this.userRepository.count({
        where: { state: STATE.ACTIVE },
      })
      const banned = await this.userRepository.count({
        where: { state: STATE.BANNED },
      })

      return {
        status: 'success',
        data: { count, actives, banned, users },
      }
    } catch (error) {
      throw new HttpException(error.driverError.detail, 400)
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} user`
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: string) {
    return `This action removes a #${id} user`
  }
}
