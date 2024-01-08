import { ClassSerializerInterceptor, Module, ValidationPipe } from '@nestjs/common';
import { PostsModule } from './modules/posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { APP_INTERCEPTOR, APP_PIPE, Reflector } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [PostsModule, UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: '10051006',
      database: 'forum',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    AuthModule],
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
