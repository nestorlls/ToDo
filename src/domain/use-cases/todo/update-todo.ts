import { UpdateDto } from '../../dtos';
import { TodoEnity } from '../../entities/todo.entity';
import { TodoResository } from '../../repositories/todo.respository';

export interface IUpdateTodoUseCase {
  execute(dto: UpdateDto): Promise<TodoEnity>;
}

export class UpdateTodo implements IUpdateTodoUseCase {
  constructor(private readonly repository: TodoResository) {}
  execute(dto: UpdateDto): Promise<TodoEnity> {
    return this.repository.update(dto);
  }
}
