import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/resources/users/entities/user.entity";
import { UsersModule } from "src/resources/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtAccess, JwtRefresh } from "./strategies";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAccess, JwtRefresh],
  exports: [AuthService],
})
export class AuthModule {}
