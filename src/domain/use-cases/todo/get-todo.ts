import { TodoEnity } from '../../entities/todo.entity';
import { TodoResository } from '../../repositories/todo.respository';

export interface IGetTodoUseCase {
  execute(id: number): Promise<TodoEnity>;
}

export class GetTodo implements IGetTodoUseCase {
  constructor(private readonly repository: TodoResository) {}
  execute(id: number): Promise<TodoEnity> {
    return this.repository.getById(id);
  }
}
