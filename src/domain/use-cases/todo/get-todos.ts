import { TodoEnity } from '../../entities/todo.entity';
import { TodoResository } from '../../repositories/todo.respository';

export interface IGetTodosUseCase {
  execute(): Promise<TodoEnity[]>;
}

export class GetTodos implements IGetTodosUseCase {
  constructor(private readonly respository: TodoResository) {}
  execute(): Promise<TodoEnity[]> {
    return this.respository.getAll();
  }
}
