import { CreateTodoDto, UpdateDto } from '../dtos';
import { TodoEnity } from '../entities/todo.entity';

export abstract class TodoDataSource {
  // todo: paginación
  abstract getAll(): Promise<TodoEnity[]>;
  abstract getById(id: number): Promise<TodoEnity>;
  abstract create(createTodoDto: CreateTodoDto): Promise<TodoEnity>;
  abstract update(updateTodoDto: UpdateDto): Promise<TodoEnity>;
  abstract delete(id: number): Promise<TodoEnity>;
}
