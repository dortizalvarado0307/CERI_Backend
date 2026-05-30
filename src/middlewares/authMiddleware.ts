import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: 'Token requerido'
    });
  }

  const token = authHeader.replace('Bearer ', '');

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as Express.Request['user'];

    req.user = decoded;

    next();

  } catch {

    return res.status(401).json({
      message: 'Token inválido'
    });

  }

};