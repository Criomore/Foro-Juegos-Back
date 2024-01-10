import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Comment } from './entities/comment.entity'
import { Repository } from 'typeorm'
import { STATE } from 'src/constants/state.enum'

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    try {
      const comment = await this.commentRepository.save(createCommentDto)

      return {
        status: 'success',
        data: {
          comment,
          message: 'Se creó correctamente el comentario.',
        },
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll() {
    try {
      const comments = await this.commentRepository.find({
        relations: ['post', 'owner'],
      })
      const count = await this.commentRepository.count()
      const banned = await this.commentRepository.count({
        where: { state: STATE.BANNED },
      })
      const actives = await this.commentRepository.count({
        where: { state: STATE.ACTIVE },
      })

      return {
        status: 'success',
        data: {
          count,
          actives,
          banned,
          comments,
        },
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(commentId: string) {
    try {
      const comment = await this.commentRepository.findOne({
        where: { id: commentId },
        relations: ['post', 'owner'],
      })

      if (comment === null) {
        throw new HttpException(
          'El comentario ha sido eliminado.',
          HttpStatus.BAD_REQUEST,
        )
      } else if (comment.state === STATE.BANNED) {
        throw new HttpException(
          'El comentario ha sido baneado',
          HttpStatus.BAD_REQUEST,
        )
      }

      return {
        status: 'success',
        data: {
          comment,
        },
      }
    } catch (error) {
      if (error.driverError)
        throw new HttpException(
          'El commentario no ha sido encontrado.',

          HttpStatus.NOT_FOUND,
        )
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async bannedComments() {
    try {
      const comments = await this.commentRepository.find({
        where: { state: STATE.BANNED },
        relations: ['posts', 'comments'],
      })

      return {
        status: 'success',
        data: {
          comments,
        },
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async banComment(commentId: string) {
    try {
      const comment = await this.commentRepository.findOne({
        where: { id: commentId },
      })

      if (comment.state === STATE.BANNED) {
        throw new HttpException(
          'El comentario ya ha sido baneado anteriormente',
          HttpStatus.BAD_REQUEST,
        )
      }

      comment.state = STATE.BANNED

      await this.commentRepository.save(comment)

      return {
        status: 'success',
        data: {
          comment,
          message: 'Se baneo correctamente el comentario',
        },
      }
    } catch (error) {
      if (error.driverError)
        throw new HttpException(
          'El commentario no ha sido encontrado.',

          HttpStatus.NOT_FOUND,
        )
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async update(commentId: string, updateCommentDto: UpdateCommentDto) {
    try {
      await this.commentRepository.update(commentId, updateCommentDto)

      const comment = await this.commentRepository.findOne({
        where: { id: commentId },
      })

      return {
        status: 'success',
        data: {
          comment,
          message: 'El comentario se ha actualizado correctamente.',
        },
      }
    } catch (error) {
      if (error.driverError)
        throw new HttpException(
          'El commentario no ha sido encontrado.',
          HttpStatus.NOT_FOUND,
        )
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(commentId: string) {
    try {
      const comment = await this.commentRepository.findOne({
        where: { id: commentId },
      })
      await this.commentRepository.remove(comment)

      return {
        status: 'success',
        data: {
          comment,
          message: 'El comentario se ha eliminado correctamente',
        },
      }
    } catch (error) {
      if (error.driverError)
        throw new HttpException(
          'El comentario no ha sido encontrado.',
          HttpStatus.NOT_FOUND,
        )
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}
