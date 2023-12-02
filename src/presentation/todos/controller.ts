import { Request, Response } from 'express';

import { prisma } from '../../data/postgresql';
import { CreateTodoDto, UpdateDto } from '../../domain/dtos';

export class TodosController {
  //* DI
  constructor() {}
  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(Number(id)))
      return res.status(400).json({ message: 'Id must be a number' });

    const todo = await prisma.todo.findUnique({
      where: { id: Number(id) },
    });

    if (!todo) {
      return res.status(404).json({ message: `Todo  with id ${id} not found` });
    }

    return res.json(todo);
  };

  public createTodo = async (req: Request, res: Response) => {
    const body = req.body;
    const { error, createTodoDto } = CreateTodoDto.create(body);

    if (error) return res.status(400).json({ error });

    const todo = await prisma.todo.create({
      data: createTodoDto!,
    });

    return res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;

    const { error, updateDto } = UpdateDto.create({ ...body, id });

    if (error) return res.status(400).json({ error });

    const todoFound = await prisma.todo.findFirst({
      where: {
        id: updateDto?.id,
      },
    });

    if (!todoFound)
      return res.status(404).json({ message: `Todo  with id ${id} not found` });

    const todo = await prisma.todo.update({
      where: { id: updateDto?.id },
      data: updateDto!.values,
    });

    return res.json(todo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(Number(id)))
      return res.status(400).json({ message: 'Id must be a number' });

    const todoFound = await prisma.todo.findUnique({
      where: { id: Number(id) },
    });

    if (!todoFound)
      return res.status(404).json({ message: `Todo  with id ${id} not found` });

    await prisma.todo.delete({
      where: { id: Number(id) },
    });

    return res.sendStatus(204);
  };
}
