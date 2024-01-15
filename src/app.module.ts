import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostsModule } from './modules/posts/posts.module'
import { UsersModule } from './modules/users/users.module'
import { CommentsModule } from './modules/comments/comments.module'
import { AuthModule } from './modules/auth/auth.module'
import { APP_INTERCEPTOR, APP_PIPE, Reflector } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import config from './config/config'



@Module({
  imports: [
    PostsModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: `../${process.env.NODE_ENV}.env`,
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: '10051006',
      database: 'forum',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CommentsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    Reflector,
  ],
})
export class AppModule {}
