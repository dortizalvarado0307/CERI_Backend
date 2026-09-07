import { Request, Response } from 'express';
import * as roleService from '../services/roleService.js';

export const getRoles = async (_req: Request, res: Response) => {
  try {
    const roles = await roleService.getAllRoles();
    return res.status(200).json({
      ok: true,
      data: roles,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error obteniendo roles',
    });
  }
};