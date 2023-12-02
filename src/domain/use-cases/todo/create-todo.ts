import { CreateTodoDto } from '../../dtos';
import { TodoEnity } from '../../entities/todo.entity';
import { TodoResository } from '../../repositories/todo.respository';

export interface ICreateTodoUseCase {
  execute(dto: CreateTodoDto): Promise<TodoEnity>;
}

export class CreateTodo implements ICreateTodoUseCase {
  constructor(private readonly repository: TodoResository) {}

  execute(dto: CreateTodoDto): Promise<TodoEnity> {
    return this.repository.create(dto);
  }
}
