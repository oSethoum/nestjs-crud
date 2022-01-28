import { Controller, Get, UseGuards } from "@nestjs/common";
import { GetUser } from "./common/decorators/get-user.decorator";
import { AccessTokenGuard } from "./common/guards/jtw-access.guard";

@Controller()
export class App {
  @Get()
  @UseGuards(AccessTokenGuard)
  hello(@GetUser() user) {
    return user;
  }
}
