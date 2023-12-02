import { Request, Response } from 'express';

import { CreateTodoDto, TodoResository, UpdateDto } from '../../domain';

export class TodosController {
  //* DI
  constructor(private readonly todoRepository: TodoResository) {}

  public getAll = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();
    console.log({ todos });
    res.json(todos);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      if (isNaN(Number(id))) {
        throw `Id "${req.params.id}" must be a valid Id`;
      }
      const todo = await this.todoRepository.getById(+id);
      return res.json(todo);
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  public create = async (req: Request, res: Response) => {
    const body = req.body;
    const { error, createTodoDto } = CreateTodoDto.create(body);
    if (error) return res.status(400).json({ error });
    const todo = await this.todoRepository.create(createTodoDto!);

    return res.json(todo);
  };

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;

    const { error, updateDto } = UpdateDto.create({ ...body, id });
    if (error) return res.status(400).json({ error });

    try {
      const updatedTodo = await this.todoRepository.update(updateDto!);
      return res.json(updatedTodo);
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      if (isNaN(Number(id))) {
        throw `Id "${req.params.id}" must be a valid Id`;
      }
      await this.todoRepository.delete(+id);
      return res.sendStatus(204);
    } catch (error) {
      res.status(400).json({ error });
    }
  };
}
