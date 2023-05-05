import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodosModule } from "./todos/todos.module";
import User from "./users/entities/user.entity";
import Todo from "./todos/entity/todo.entity";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite",
      entities: [User, Todo],
      synchronize: true
    }),
    UsersModule,
    TodosModule
  ]

})
export class AppModule {
}
