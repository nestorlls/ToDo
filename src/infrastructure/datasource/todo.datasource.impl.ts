import { prisma } from '../../data/postgresql';
import {
  CreateTodoDto,
  UpdateDto,
  TodoDataSource,
  TodoEnity,
} from '../../domain';

export class TodoDataSourceImpl implements TodoDataSource {
  async getAll(): Promise<TodoEnity[]> {
    const todos = await prisma.todo.findMany({ orderBy: { id: 'asc' } });
    return todos.map(TodoEnity.fromObject);
  }

  async getById(id: number): Promise<TodoEnity> {
    const todo = await prisma.todo.findUnique({ where: { id: Number(id) } });
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`);
    }
    return TodoEnity.fromObject(todo);
  }

  async create(createTodoDto: CreateTodoDto): Promise<TodoEnity> {
    const todo = await prisma.todo.create({
      data: createTodoDto!,
    });
    return TodoEnity.fromObject(todo);
  }

  async update(updateTodoDto: UpdateDto): Promise<TodoEnity> {
    await this.getById(updateTodoDto.id);
    const updatedTodo = await prisma.todo.update({
      where: { id: updateTodoDto?.id },
      data: updateTodoDto!.values,
    });
    return TodoEnity.fromObject(updatedTodo);
  }
  async delete(id: number): Promise<TodoEnity> {
    await this.getById(id);
    const deletedTodo = await prisma.todo.delete({ where: { id } });
    return TodoEnity.fromObject(deletedTodo);
  }
}
