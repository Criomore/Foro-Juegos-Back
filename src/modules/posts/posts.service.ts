import { HttpException, Injectable } from '@nestjs/common'
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

  findOne(id: string) {
    return `This action returns a #${id} post`
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`
  }

  remove(id: string) {
    return `This action removes a #${id} post`
  }
}
