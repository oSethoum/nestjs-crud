import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "src/common/decorators/is-public.decorator";
import { AccessTokenGuard } from "src/common/guards/jtw-access.guard";
import { RefreshTokenGuard } from "src/common/guards/jwt-refresh.guard";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(200)
  @Post("login")
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Public()
  @Post("register")
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @UseGuards(AccessTokenGuard)
  @Get("logout")
  async logout(@Req() req) {
    return this.authService.logout(req.user.username);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post("refresh")
  async refresh() {
    return this.authService.refresh();
  }
}
