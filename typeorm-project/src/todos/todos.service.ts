import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import Todo from "./entity/todo.entity";
import { ObjectLiteral, Repository} from "typeorm";
import CreateTodoDto from "./dto/create-todo.dto";
import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";

type todoPaginateParams = {
    skip?: number;
    take?: number;
    where?: FindOptionsWhere<Todo>
}

@Injectable()
export class TodosService {

    constructor(
      @InjectRepository(Todo) private todoRepo: Repository<Todo>
    ) {
    }


    todo(id: number): Promise<Todo> {
        return this.todoRepo.findOne({ where: { id } });
    }


    getUsersTodos(userId: number, todoParams ?: todoPaginateParams): Promise<Todo[]> {
        return this.todoRepo.find({
            where: {
                userId: userId,
            },
            skip: todoParams.skip,
            take: todoParams.take
        })
    }


    createTodo(data: CreateTodoDto): Promise<Todo> {
        const todo = this.todoRepo.create(data);
        return this.todoRepo.save(todo);
    }


    updateTodo(id: number, data: Partial<Todo>): Promise<Todo> {
        return this.todoRepo.save({
            id,
            ...data
        })
    }


    async deleteTodo(id: number): Promise<void> {
        await this.todoRepo.delete(id);
    }

}
