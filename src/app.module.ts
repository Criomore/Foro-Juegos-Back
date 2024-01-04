import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    })],
  controllers: [],
  providers: [],
})
export class AppModule {}
