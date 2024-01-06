import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { STATE } from 'src/constants/state.enum'
import { error } from 'console'

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
      throw new HttpException(
        error.driverError ? error.driverError.detail : error,
        400,
      )
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
      throw new HttpException(
        error.driverError ? error.driverError.detail : error,
        400,
      )
    }
  }

  async findOne(userId: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } })
      return {
        status: 'success',
        data: { user },
      }
    } catch (error) {
      if (error.driverError.code === '22P02') {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
      }
      throw new HttpException(error, 400)
    }
  }

  async findActiveUsers() {
    try {
      const users = await this.userRepository.find({
        where: { state: STATE.ACTIVE },
      })
      const count = await this.userRepository.count({
        where: { state: STATE.ACTIVE },
      })
      return {
        status: 'success',
        data: { count, users },
      }
    } catch (error) {
      throw new HttpException(error, 400)
    }
  }

  async findBannedUsers() {
    try {
      const users = await this.userRepository.find({
        where: { state: STATE.BANNED },
      })
      const count = await this.userRepository.count({
        where: { state: STATE.BANNED },
      })
      return {
        status: 'success',
        data: { count, users },
      }
    } catch (error) {
      throw new HttpException(error, 400)
    }
  }

  async banUser(userId: string, reason: string[]) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } })

      if (user.state === STATE.BANNED) {
        throw new HttpException(
          'El usuario ya ha sido baneado anteriormente',
          HttpStatus.BAD_REQUEST,
        )
      }

      user.state = STATE.BANNED

      await this.userRepository.save(user)

      return {
        status: 'success',
        data: {
          user,
          message: 'El usuario fue baneado correctamente',
        },
      }
    } catch (error) {
      if (error.driverError) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
      }
      throw new HttpException(error, 400)
    }
  }

  async unBanUser(userId: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } })

      if (user.state === STATE.ACTIVE) {
        throw new HttpException(
          'El usuario ya esta desbaneado',
          HttpStatus.BAD_REQUEST,
        )
      }

      user.state = STATE.ACTIVE

      await this.userRepository.save(user)

      return {
        status: 'success',
        data: {
          user,
          message: 'El usuario fue desbaneado correctamente',
        },
      }
    } catch (error) {
      if (error.driverError) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
      }
      throw new HttpException(error, 400)
    }
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    try {
      await this.userRepository.update(userId, updateUserDto)

      const user = await this.userRepository.findOne({ where: { id: userId } })

      return {
        status: 'success',
        data: {
          user,
          message: 'El usuario se ha actualizado correctamente',
        },
      }
    } catch (error) {
      if (error.driverError) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
      }
      throw new HttpException(error, 400)
    }
  }

  async remove(userId: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } })
      await this.userRepository.remove(user)

      return {
        status: 'success',
        data: {
          user,
          message: 'El usuario se elimino correctamente',
        },
      }
    } catch (error) {
      if (error.driverError) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
      }
      throw new HttpException(error, 400)
    }
  }
}
