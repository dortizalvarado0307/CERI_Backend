import { Request, Response } from 'express';
import * as userService from '../services/usersService.js';
import { success, created, error, notFound, ok, asyncHandler } from '../utils/response.js';

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const page = req.query.page ? Number(req.query.page) : undefined;
  const limit = req.query.limit ? Number(req.query.limit) : undefined;
  const users = await userService.getAllUsers(page, limit);
  success(res, users);
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.getUserById(Number(req.params.id));
  if (!user) return notFound(res, 'Usuario no encontrado');
  success(res, user);
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  created(res, user, 'Usuario creado correctamente');
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.updateUser(Number(req.params.id), req.body);
  success(res, user);
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  await userService.deleteUser(Number(req.params.id));
  ok(res, 'Usuario desactivado');
});