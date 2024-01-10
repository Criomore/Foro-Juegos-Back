import { IsString } from 'class-validator'
import { Post } from 'src/modules/posts/entities/post.entity'
import { User } from 'src/modules/users/entities/user.entity'

export class CreateCommentDto {
  @IsString()
  description: string

  @IsString()
  owner: User
  
  @IsString()
  post: Post
}
