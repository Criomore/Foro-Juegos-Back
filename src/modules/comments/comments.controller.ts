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
import { CommentsService } from './comments.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { AuthGuard } from '../auth/guards/auth.guard'
import { PublicAccess } from '../auth/decorators/public.decorator'

@Controller('comments')
@UseGuards(AuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  
  //user
  @Post('create')
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto)
  }

  //admin
  @Get('all')
  findAll() {
    return this.commentsService.findAll()
  }

  //user
  @PublicAccess()
  @Get('id/:commentId')
  findOne(@Param('commentId') commentId: string) {
    return this.commentsService.findOne(commentId)
  }

  //admin
  @Get('banned')
  bannedComments() {
    return this.commentsService.bannedComments()
  }

  //admin
  @Patch('ban/:commentId')
  banComment(@Param('commentId') commentId: string) {
    return this.commentsService.banComment(commentId)
  }

  //user
  @Patch('update/:commentId')
  update(
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(commentId, updateCommentDto)
  }

  //user
  @Delete('delete/:commentId')
  remove(@Param('commentId') commentId: string) {
    return this.commentsService.remove(commentId)
  }
}
