import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from './entities/post.entity'
import { Repository } from 'typeorm'
import { STATE } from 'src/constants/state.enum'

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    try {
      const post = await this.postRepository.save(createPostDto)

      return {
        status: 'success',
        data: {
          post,
          message: 'Se creó correctamente la publicación.',
        },
      }
    } catch (error) {
      throw new HttpException(error, 400)
    }
  }

  async findAll() {
    try {
      const posts = await this.postRepository.find()
      const count = await this.postRepository.count()
      const actives = await this.postRepository.count({
        where: { state: STATE.ACTIVE },
      })
      const banned = await this.postRepository.count({
        where: { state: STATE.BANNED },
      })

      return {
        status: 'success',
        data: {
          count,
          actives,
          banned,
          posts,
        },
      }
    } catch (error) {
      throw new HttpException(error, 400)
    }
  }

  async findOne(postId: string) {
    try {
      const post = await this.postRepository.findOne({ where: { id: postId } })

      return {
        status: 'success',
        data: {
          post,
        },
      }
    } catch (error) {
      if (error.driverError.code === '22P02')
        throw new HttpException(
          'La publicación no ha sido encontrada.',
          HttpStatus.NOT_FOUND,
        )
      throw new HttpException(error, 400)
    }
  }

  async findActivePosts() {
    try {
      const post = await this.postRepository.find({
        where: { state: STATE.ACTIVE },
      })
      const count = await this.postRepository.count({
        where: { state: STATE.ACTIVE },
      })

      return {
        status: 'success',
        count,
        data: {
          post,
        },
      }
    } catch (error) {
      throw new HttpException(error, 400)
    }
  }

  async findBannedPosts() {
    try {
      const post = await this.postRepository.find({
        where: { state: STATE.BANNED },
      })
      const count = await this.postRepository.count({
        where: { state: STATE.BANNED },
      })

      return {
        status: 'success',
        count,
        data: {
          post,
        },
      }
    } catch (error) {
      throw new HttpException(error, 400)
    }
  }

  async banPost(postId: string, reason: string[]) {
    try {
      const post = await this.postRepository.findOne({ where: { id: postId } })

      if (post.state === STATE.BANNED) {
        console.log('jaider bonito')
        throw new HttpException(
          'La publicación ya ha sido baneado anteriormente',
          HttpStatus.BAD_REQUEST,
        )
      }
      post.state = STATE.BANNED

      await this.postRepository.save(post)

      return {
        status: 'success',
        data: {
          post,
          message: 'La publicación fue baneada correctamente.',
        },
      }
    } catch (error) {
      if (error.driverError)
        throw new HttpException(
          'La publicación no ha sido encontrada.',
          HttpStatus.NOT_FOUND,
        )
      throw new HttpException(error, 400)
    }
  }

  async unBanPost(postId: string) {
    try {
      const post = await this.postRepository.findOne({ where: { id: postId } })

      if (post.state === STATE.ACTIVE) {
        console.log('jaider bonito')
        throw new HttpException(
          'La publicación ya esta desbaneada',
          HttpStatus.BAD_REQUEST,
        )
      }
      post.state = STATE.ACTIVE

      await this.postRepository.save(post)

      return {
        status: 'success',
        data: {
          post,
          message: 'La publicación fue desbaneada correctamente.',
        },
      }
    } catch (error) {
      if (error.driverError)
        throw new HttpException(
          'La publicación no ha sido encontrada.',
          HttpStatus.NOT_FOUND,
        )
      throw new HttpException(error, 400)
    }
  }

  async update(postId: string, updatePostDto: UpdatePostDto) {
    try {
      await this.postRepository.update(postId, updatePostDto)

      const post = await this.postRepository.findOne({ where: { id: postId } })

      return {
        status: 'success',
        data: {
          post,
          message: 'La publicación se ha actualizado correctamente',
        },
      }
    } catch (error) {
      if (error.driverError)
        throw new HttpException(
          'La publicación no ha sido encontrada.',
          HttpStatus.NOT_FOUND,
        )
      throw new HttpException(error, 400)
    }
  }

  async remove(postId: string) {
    try {
      const post = await this.postRepository.findOne({ where: { id: postId } })
      await this.postRepository.remove(post)

      return {
        status: 'success',
        data: {
          post,
          message: 'La publicación se ha eliminado correctamente'
        }
      }

    } catch (error) {
      if (error.driverError)
        throw new HttpException(
          'La publicación no ha sido encontrada.',
          HttpStatus.NOT_FOUND,
        )
      throw new HttpException(error, 400)
    }
  }
}
