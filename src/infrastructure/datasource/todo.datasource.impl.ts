import { prisma } from '../../data/postgresql';
import {
  CreateTodoDto,
  UpdateDto,
  TodoDataSource,
  TodoEnity,
  CustomeError,
} from '../../domain';
import { validatedId } from '../../helpers';

export class TodoDataSourceImpl implements TodoDataSource {
  async getAll(): Promise<TodoEnity[]> {
    const todos = await prisma.todo.findMany({ orderBy: { id: 'asc' } });
    return todos.map(TodoEnity.fromObject);
  }

  async getById(id: number): Promise<TodoEnity> {
    validatedId(id);
    const todo = await prisma.todo.findUnique({ where: { id } });
    if (!todo) {
      throw new CustomeError(`Todo with id ${id} not found`, 404);
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
