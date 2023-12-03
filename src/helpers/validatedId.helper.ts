import { CustomeError } from '../domain';

export const validatedId = (id: number): void => {
  if (isNaN(Number(id))) {
    throw new CustomeError('Id must be a number', 400);
  }

  if (id <= 0) {
    throw new CustomeError('Id must be greater than 0', 400);
  }
};
