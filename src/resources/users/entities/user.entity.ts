import { Post } from "src/resources/posts/entities/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  // hashed
  @Column({ select: false, nullable: true })
  token: string;
  // hashed
  @Column({ select: false })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts?: Post[];
}
