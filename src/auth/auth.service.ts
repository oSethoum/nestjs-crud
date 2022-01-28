import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotImplementedException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/resources/users/entities/user.entity";
import { Repository } from "typeorm";
import { LoginDto, RegisterDto } from "./dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private getTokens(payload: any) {
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: 60 * 15, //15 min,
        secret: "ACCESS-SECRET",
      }),
      token: this.jwtService.sign(payload, {
        expiresIn: 3600 * 24 * 20, //20 days,
        secret: "REFRESH-SECRET",
      }),
    };
  }

  async login({ username, password }: LoginDto) {
    console.log("login service");

    const user = await this.usersRepository.createQueryBuilder("user")
      .addSelect("user.password")
      .addSelect("user.token")
      .where("user.username=:username", { username })
      .getOne();
    console.log(user);

    if (user && user.token) {
      throw new UnauthorizedException("User already logged in");
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      const payload = { username: user.username, sub: user.id };

      const { accessToken, token } = this.getTokens(payload);

      this.usersRepository.createQueryBuilder()
        .update()
        .set({ token })
        .where("username=:username", { username })
        .execute();

      return { accessToken, token };
    }
    throw new UnauthorizedException("Wrong Credentials");
  }

  async register(dto: RegisterDto) {
    try {
      const user = this.usersRepository.create({
        ...dto,
        password: bcrypt.hashSync(dto.password, 10),
      });
      const { password, ...rest } = await this.usersRepository.save(user);
      return rest;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async refresh() {
    throw new NotImplementedException();
  }

  async logout(username: string) {
    const user = await this.usersRepository.createQueryBuilder()
      .addSelect("user.refresh_token")
      .where("username=:username", { username })
      .getOne();

    if (user && user.token === undefined) {
      throw new UnauthorizedException("User logged out already");
    }

    const updateResult = await this.usersRepository
      .createQueryBuilder()
      .update()
      .where("username=:username", { username })
      .set({ token: null })
      .execute();

    console.log("Updated Results ", updateResult);

    if (updateResult.affected > 0) {
      return { message: "success" };
    }
    throw new NotImplementedException();
  }
}
