import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { PrismaService } from "./prisma-service/prisma.service";
import { UserService } from "./user/user.service";
import { TodoService } from "./todo/todo.service";

@Module({
  controllers: [AppController],
  providers: [PrismaService, UserService, TodoService]
})
export class AppModule {
}
