import { CreateTodo } from './todo/create-todo';
import { UpdateTodo } from './todo/update-todo';
import { GetTodo } from './todo/get-todo';
import { GetTodos } from './todo/get-todos';
import { DeleteTodo } from './todo/delete-todo';

export const UseCases = {
  Todo: {
    CreateTodo,
    DeleteTodo,
    GetTodo,
    GetTodos,
    UpdateTodo,
  },
};
