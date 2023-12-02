import {
  CreateTodoDto,
  TodoDataSource,
  TodoEnity,
  TodoResository,
  UpdateDto,
} from '../../domain';

export class TodoRepositoryImpl implements TodoResository {
  constructor(private readonly dataSource: TodoDataSource) {}

  getAll(): Promise<TodoEnity[]> {
    return this.dataSource.getAll();
  }

  getById(id: number): Promise<TodoEnity> {
    return this.dataSource.getById(id);
  }

  create(createTodoDto: CreateTodoDto): Promise<TodoEnity> {
    return this.dataSource.create(createTodoDto);
  }

  update(updateTodoDto: UpdateDto): Promise<TodoEnity> {
    return this.dataSource.update(updateTodoDto);
  }

  delete(id: number): Promise<TodoEnity> {
    return this.dataSource.delete(id);
  }
}
