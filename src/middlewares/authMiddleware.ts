import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET no está configurado en las variables de entorno');
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      ok: false,
      message: 'Token requerido'
    });
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      ok: false,
      message: 'Formato de autorización inválido. Use Bearer <token>'
    });
  }

  const token = authHeader.slice(7);

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as Express.Request['user'];

    req.user = decoded;

    next();

  } catch {

    return res.status(401).json({
      ok: false,
      message: 'Token inválido'
    });

  }

};