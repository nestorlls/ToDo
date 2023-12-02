import { Request, Response, NextFunction } from 'express';

export const parseId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.status(400).json({ error: 'Id must be a valid number Id' });
  }
  next();
};
