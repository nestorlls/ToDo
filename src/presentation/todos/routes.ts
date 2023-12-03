import { Router } from 'express';
import { TodosController } from './controller';
import { TodoDataSourceImpl, TodoRepositoryImpl } from '../../infrastructure';

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    const dataSource = new TodoDataSourceImpl();
    const repository = new TodoRepositoryImpl(dataSource);
    const todosController = new TodosController(repository);

    router.get('/', todosController.getAll);
    router.get('/:id', todosController.getById);
    router.post('/', todosController.create);
    router.put('/:id', todosController.update);
    router.delete('/:id', todosController.deleteTodo);

    return router;
  }
}
