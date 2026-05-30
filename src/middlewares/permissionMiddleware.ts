import {
  Request,
  Response,
  NextFunction
} from 'express';

export const authorizePermission =
  (permission: string) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    if (!req.user) {

      return res.status(401).json({
        message: 'No autenticado'
      });

    }

    if (
      !req.user.permissions.includes(
        permission
      )
    ) {

      return res.status(403).json({
        message: 'No autorizado'
      });

    }

    next();

  };