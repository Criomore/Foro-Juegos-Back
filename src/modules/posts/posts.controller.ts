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
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { AuthGuard } from '../auth/guards/auth.guard'
import { PublicAccess } from '../auth/decorators/public.decorator'

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  //user
  @Post('create')
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto)
  }

  //admin
  @Get('all')
  findAll() {
    return this.postsService.findAll()
  }

  //public
  @PublicAccess()
  @Get('id/:postId')
  findOne(@Param('postId') postId: string) {
    return this.postsService.findOne(postId)
  }

  //public
  @PublicAccess()
  @Get('active')
  findActivePosts() {
    return this.postsService.findActivePosts()
  }

  //admin
  @Get('banned')
  findBannedPosts() {
    return this.postsService.findBannedPosts()
  }

  //user
  @Patch('like/:postId')
  likePost(@Param('postId') postId: string) {
    return this.postsService.likePost(postId)
  }

  //user
  @Patch('dislike/:postId')
  dislikePost(@Param('postId') postId: string) {
    return this.postsService.dislikePost(postId)
  }

  //admin
  @Patch('ban/:postId')
  banPost(@Param('postId') postId: string, @Body() reason: string[]) {
    return this.postsService.banPost(postId, reason)
  }

  //admin
  @Patch('unban/:postId')
  unBanPost(@Param('postId') postId: string) {
    return this.postsService.unBanPost(postId)
  }

  //user
  @Patch('update/:postId')
  update(
    @Param('postId') postId: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(postId, updatePostDto)
  }

  //user
  @Delete('delete/:postId')
  remove(@Param('id') postId: string) {
    return this.postsService.remove(postId)
  }
}
