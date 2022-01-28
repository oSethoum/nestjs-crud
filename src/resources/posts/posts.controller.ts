import { Controller } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Crud, CrudController } from "@nestjsx/crud";
import { Post } from "./entities/post.entity";
import { ApiTags } from "@nestjs/swagger";

@Crud({
  model: {
    type: Post,
  },
})
@ApiTags("posts")
@Controller("posts")
export class PostsController implements CrudController<Post> {
  constructor(public service: PostsService) {
  }
}

@Crud({
  model: {
    type: Post,
  },
  params: {
    userId: {
      field: "userId",
      type: "number",
    },
  },
})
@ApiTags("users/{userId}/posts")
@Controller("users/:userId/posts")
export class UsersPostsController implements CrudController<Post> {
  constructor(public service: PostsService) {
  }
}
