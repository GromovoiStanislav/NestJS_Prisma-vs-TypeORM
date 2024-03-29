import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { UserService } from "./user/user.service";
import { TodoService } from "./todo/todo.service";
import { Todo, User } from "@prisma/client";
import UpdateTodoDto from "./dto/updateTodo.dto";
import CreateTodoDto from "./dto/createTodo.dto";
import TodosQueryDto from "./dto/todosQuery.dto";
import CreateUserDto from "./dto/createUser.dto";
import GetUserDto from "./dto/getUser.dto";
import UpdateUserDto from "./dto/updateUser.dto";

@Controller()
export class AppController {

  constructor(
    private readonly userService: UserService,
    private readonly todoService: TodoService) {
  }


  @Get("todo/:id")
  getTodo(@Param("id") id: string): Promise<Todo> {
    return this.todoService.todo(+id);
  }


  @Get("todos")
  getTodos(): Promise<Todo[]> {
    return this.todoService.todos({});
  }


  @Get("todo/user/:id")
  GetUsersTodos(
    @Param("id") id: number,
    @Query() query: TodosQueryDto
  ): Promise<Todo[]> {
    return this.todoService.getUsersTodos(+id, (query) ? {
      take: +query.take,
      skip: +query.skip,
      orderBy: {
        createdAt: "desc"
      }
    } : null);
  }


  @Post("todo")
  createTodo(@Body() body: CreateTodoDto): Promise<Todo> {
    const { userId, ...other } = body;
    return this.todoService.createTodo({
      ...other,
      user: {
        connect: {
          id: userId
        }
      }
    });
  }


  @Put("todo")
  editTodo(@Body() body: UpdateTodoDto): Promise<Todo> {
    const { id, ...other } = body;
    return this.todoService.updateTodo(id, other);
  }


  @Delete("todo/:id")
  deleteTodo(@Param("id") id: number): Promise<Todo> {
    return this.todoService.deleteTodo(+id);
  }


  //*******************************************************//


  @Get("users")
  getUsers(
    @Query("skip") skip: string,
    @Query("take") take: string
  ): Promise<User[]> {
    return this.userService.users({});
  }


  @Get("user")
  getUser(@Query() query: GetUserDto): Promise<User> {
    return this.userService.user(+query.id, query.includeTodos);
  }


  @Post("user")
  createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.createUser(body);
  }


  @Put("user")
  editUser(@Body() body: UpdateUserDto): Promise<User> {
    const { id, ...other } = body;
    return this.userService.updateUser(+id, other);
  }


  @Delete("user/:id")
  deleteUser(@Param("id", ParseIntPipe) id: number): Promise<User> {
    return this.userService.deleteUser(id);
  }

}
