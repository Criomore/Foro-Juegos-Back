import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { STATE } from 'src/constants/state.enum'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await bcrypt.hash(createUserDto.password, process.env.HASH_SALT)

      const user = await this.userRepository.save(createUserDto)

      return {
        status: 'success',
        data: { user, message: 'Se creo correctamente el usuario' },
      }
    } catch (error) {
      throw new HttpException(
        error.driverError ? error.driverError.detail : error,
        HttpStatus.BAD_REQUEST,
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
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async findOne(userId: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } })

      if (user === null)
        throw new HttpException(
          `El usuario con id ${userId} ha sido eliminado`,
          HttpStatus.BAD_REQUEST,
        )
      else if (user.state === STATE.BANNED)
        throw new HttpException(
          `El usuario con id ${userId} ha sido baneado`,
          HttpStatus.BAD_REQUEST,
        )

      return {
        status: 'success',
        data: { user },
      }
    } catch (error) {
      if (error.driverError) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
      }
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async findBy({ key, value }: { key: keyof CreateUserDto; value: any }) {
    try {
      const user: User = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where({ [key]: value })
        .getOne()

      return user
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
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
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
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
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
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
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
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
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
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
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
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
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}
