import { Router } from 'express';
import { TodosController } from './controller';
import { TodoDataSourceImpl, TodoRepositoryImpl } from '../../infrastructure';
import { parseId } from '../../middlewares/parce-id.middleware';

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    const dataSource = new TodoDataSourceImpl();
    const repository = new TodoRepositoryImpl(dataSource);
    const todosController = new TodosController(repository);

    router.get('/', todosController.getAll);
    router.get('/:id', [parseId], todosController.getById);
    router.post('/', todosController.create);
    router.put('/:id', [parseId], todosController.update);
    router.delete('/:id', [parseId], todosController.deleteTodo);

    return router;
  }
}
