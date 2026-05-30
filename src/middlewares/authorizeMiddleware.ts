import { Request, Response, NextFunction } from 'express';

export const authorize =
  (...roles: number[]) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    const user = req.user;

    if (!user) {

      return res.status(401).json({
        message: 'Usuario no autenticado'
      });

    }

    if (!roles.includes(user.roleId)) {

      return res.status(403).json({
        message: 'Sin permisos'
      });

    }

    next();

  };