import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";
import { User } from "./resources/users/entities/user.entity";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { UsersModule } from "./resources/users/users.module";
import { PostsModule } from "./resources/posts/posts.module";
import { Post } from "./resources/posts/entities/post.entity";
import { AuthModule } from "./auth/auth.module";
import { App } from "./app.controller";
import { APP_GUARD } from "@nestjs/core";
import { AccessTokenGuard } from "./common/guards/jtw-access.guard";

const config: SqliteConnectionOptions = {
  database: "database.db",
  type: "sqlite",
  entities: [User, Post],
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
};

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(config),
    PostsModule,
    AuthModule,
  ],
  controllers: [App],
  // providers: [{
  //   provide: APP_GUARD,
  //   useClass: AccessTokenGuard,
  // }],
})
export class AppModule {}
