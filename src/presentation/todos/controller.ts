import { Request, Response } from 'express';

import {
  CreateTodoDto,
  CustomeError,
  TodoResository,
  UpdateDto,
  UseCases,
} from '../../domain';

export class TodosController {
  //* DI
  constructor(private readonly todoRepository: TodoResository) {}

  private handleError(res: Response, error: unknown) {
    if (error instanceof CustomeError) {
      return res
        .status(error.statusCode)
        .json({ statusCode: error.statusCode, error: error.message });
    }

    // default error and save in log
    return res
      .status(500)
      .json({ statusCode: 500, error: 'Internal server error' });
  }

  public getAll = (req: Request, res: Response) => {
    new UseCases.Todo.GetTodos(this.todoRepository)
      .execute()
      .then((todos) => res.json(todos))
      .catch((error) => this.handleError(res, error));
  };

  public getById = (req: Request, res: Response) => {
    const { id } = req.params;

    new UseCases.Todo.GetTodo(this.todoRepository)
      .execute(+id)
      .then((todo) => res.json(todo))
      .catch((error) => this.handleError(res, error));
  };

  public create = (req: Request, res: Response) => {
    const body = req.body;
    const { error, createTodoDto } = CreateTodoDto.create(body);
    if (error) return res.status(400).json({ error });
    new UseCases.Todo.CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then((todo) => res.status(201).json(todo))
      .catch((error) => this.handleError(res, error));
  };

  public update = (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;

    const { error, updateDto } = UpdateDto.create({ ...body, id });
    if (error) return res.status(400).json({ error });

    new UseCases.Todo.UpdateTodo(this.todoRepository)
      .execute(updateDto!)
      .then((todo) => res.json(todo))
      .catch((error) => this.handleError(res, error));
  };

  public deleteTodo = (req: Request, res: Response) => {
    const { id } = req.params;

    new UseCases.Todo.DeleteTodo(this.todoRepository)
      .execute(+id)
      .then((todo) => res.json(todo))
      .catch((error) => this.handleError(res, error));
  };
}
