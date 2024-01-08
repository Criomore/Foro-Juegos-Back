import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('create')
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto)
  }

  @Get('all')
  findAll() {
    return this.commentsService.findAll()
  }

  @Get('id/:commentId')
  findOne(@Param('commentId') commentId: string) {
    return this.commentsService.findOne(commentId)
  }

  @Get('banned')
  bannedComments() {
    return this.commentsService.bannedComments()
  }

  @Patch('ban/:commentId')
  banComment(@Param('commentId') commentId: string) {
    return this.commentsService.banComment(commentId)
  }

  @Patch('update/:commentId')
  update(
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(commentId, updateCommentDto)
  }

  @Delete('delete/:commentId')
  remove(@Param('commentId') commentId: string) {
    return this.commentsService.remove(commentId)
  }
}
