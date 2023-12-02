import { Request, Response } from 'express';

import {
  CreateTodoDto,
  TodoResository,
  UpdateDto,
  UseCases,
} from '../../domain';

export class TodosController {
  //* DI
  constructor(private readonly todoRepository: TodoResository) {}

  public getAll = (req: Request, res: Response) => {
    new UseCases.Todo.GetTodos(this.todoRepository)
      .execute()
      .then((todos) => res.json(todos))
      .catch((error) => res.status(400).json({ error }))
      .finally(console.log);
  };

  public getById = (req: Request, res: Response) => {
    const { id } = req.params;

    new UseCases.Todo.GetTodo(this.todoRepository)
      .execute(+id)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public create = (req: Request, res: Response) => {
    const body = req.body;
    const { error, createTodoDto } = CreateTodoDto.create(body);
    if (error) return res.status(400).json({ error });
    new UseCases.Todo.CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public update = (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;

    const { error, updateDto } = UpdateDto.create({ ...body, id });
    if (error) return res.status(400).json({ error });

    new UseCases.Todo.UpdateTodo(this.todoRepository)
      .execute(updateDto!)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public deleteTodo = (req: Request, res: Response) => {
    const { id } = req.params;

    new UseCases.Todo.DeleteTodo(this.todoRepository)
      .execute(+id)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };
}
