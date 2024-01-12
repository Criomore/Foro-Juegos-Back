import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('create')
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto)
  }

  @Get('all')
  findAll() {
    return this.postsService.findAll()
  }

  @Get('id/:postId')
  findOne(@Param('postId') postId: string) {
    return this.postsService.findOne(postId)
  }

  @Get('active')
  findActivePosts() {
    return this.postsService.findActivePosts()
  }

  @Get('banned')
  findBannedPosts() {
    return this.postsService.findBannedPosts()
  }

  @Patch('like/:postId')
  likePost(@Param('postId') postId: string) {
    return this.postsService.likePost(postId)
  }

  @Patch('dislike/:postId')
  dislikePost(@Param('postId') postId: string) {
    return this.postsService.dislikePost(postId)
  }

  @Patch('ban/:postId')
  banPost(@Param('postId') postId: string, @Body() reason: string[]) {
    return this.postsService.banPost(postId, reason)
  }

  @Patch('unban/:postId')
  unBanPost(@Param('postId') postId: string) {
    return this.postsService.unBanPost(postId)
  }

  @Patch('update/:postId')
  update(
    @Param('postId') postId: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(postId, updatePostDto)
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id)
  }
}
