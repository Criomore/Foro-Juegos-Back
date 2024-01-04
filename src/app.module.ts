import { Module } from '@nestjs/common';
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [PostsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
