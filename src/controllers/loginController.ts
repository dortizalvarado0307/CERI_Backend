import { Request, Response } from 'express';
import * as userService from '../services/usersService.js';
import { generateToken } from '../utils/auth/jwt.js';

export const login = async (
  req: Request,
  res: Response
) => {
  try {

    const { email, password } = req.body;

    const user = await userService.login(
      email,
      password
    );

    const permissions =
      user.role.role_permission.map(
        rp => rp.permission.name
      );

    const token = generateToken(
      user.id,
      user.id_role,
      permissions
    );

    return res.status(200).json({
      ok: true,
      data: { token }
    });

  } catch (error) {

    const message =
      error instanceof Error ? error.message : 'Error desconocido';

    if (message === 'Usuario no encontrado' || message === 'Contraseña incorrecta') {
      return res.status(401).json({
        ok: false,
        message: 'Credenciales inválidas'
      });
    }

    console.error(error);

    return res.status(500).json({
      ok: false,
      message: 'Error en el inicio de sesión'
    });

  }
};