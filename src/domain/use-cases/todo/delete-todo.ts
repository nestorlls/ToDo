import { TodoEnity } from '../../entities/todo.entity';
import { TodoResository } from '../../repositories/todo.respository';

export interface IDeleteTodoUseCase {
  execute(id: number): Promise<TodoEnity>;
}

export class DeleteTodo implements IDeleteTodoUseCase {
  constructor(private readonly repository: TodoResository) {}
  execute(id: number): Promise<TodoEnity> {
    return this.repository.delete(id);
  }
}
