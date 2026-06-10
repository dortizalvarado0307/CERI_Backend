import { Request, Response } from 'express';

import * as userService from '../services/usersService.js';

export const getUsers = async (
  _req: Request,
  res: Response
) => {

  try {

    const users = await userService.getAllUsers();

    return res.status(200).json(users);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: 'Error obteniendo usuarios'
    });

  }

};

export const getUser = async (
  req: Request,
  res: Response
) => {

  try {

    const id = Number(req.params.id);

    const user = await userService.getUserById(id);

    if (!user) {

      return res.status(404).json({
        message: 'Usuario no encontrado'
      });

    }

    return res.status(200).json(user);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: 'Error obteniendo usuario'
    });

  }

};

export const createUser = async (
  req: Request,
  res: Response
) => {

  try {

    const user = await userService.createUser(req.body);

    return res.status(201).json({
      message: 'Usuario creado correctamente',
      user
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: 'Error creando usuario'
    });

  }

};

export const updateUser = async (
  req: Request,
  res: Response
) => {

  try {

    const id = Number(req.params.id);

    const user = await userService.updateUser(
      id,
      req.body
    );

    return res.status(200).json({
      message: 'Usuario actualizado',
      user
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: 'Error actualizando usuario'
    });

  }

};

export const deleteUser = async (
  req: Request,
  res: Response
) => {

  try {

    const id = Number(req.params.id);

    await userService.updateUser(id, { active: false });

    return res.status(200).json({
      message: 'Usuario desactivado'
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: 'Error desactivando usuario'
    });

  }

};