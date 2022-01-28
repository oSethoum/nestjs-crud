import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Crud({
  model: {
    type: User,
  },
  query: {
    exclude: ["token", "password"],
    join: {
      posts: {
        eager: true,
        exclude: ["userId"],
      },
    },
  },
})
@ApiTags("users")
@Controller("users")
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}
}
