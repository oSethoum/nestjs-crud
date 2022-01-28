import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController, UsersPostsController } from "./posts.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./entities/post.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController, UsersPostsController],
  providers: [PostsService],
})
export class PostsModule {}
