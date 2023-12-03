import { Router } from 'express';
import { TodoRoutes } from './todos/routes';
import { notFoundMiddleware } from '../middlewares';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    const apiRoutes = Router();

    apiRoutes.use('/todos', TodoRoutes.routes);

    router.use('/api/v1', apiRoutes);
    router.use(notFoundMiddleware);

    return router;
  }
}
