import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";
import { User } from "./users/entities/user.entity";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const config: SqliteConnectionOptions = {
  database: "database.db",
  type: "sqlite",
  entities: [User],
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
};

@Module({
  imports: [TypeOrmModule.forRoot(config)],
})
export class AppModule {}
