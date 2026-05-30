import prisma from '../config/db.js';
import { comparePassword, hashPassword } from '../utils/password/password.js';
import { CreateUserDTO } from '../dtos/user/createUserDTO.js';
import { UpdateUserDTO } from '../dtos/user/updateUserDTO.js';



export const login = async (
  email: string,
  password: string
) => {

  const user = await prisma.user.findUnique({
    where: {
      email
    },
    include: {
      role: {
        include: {
          role_permission: {
            include: {
              permission: true
            }
          }
        }
      }
    }
  });

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const isValidPassword = await comparePassword(
    password,
    user.password
  );

  if (!isValidPassword) {
    throw new Error('Contraseña incorrecta');
  }

  return user;
};

export const getAllUsers = async () => {

  return await prisma.user.findMany({
    include: {
      role: true
    }
  });

};

export const getUserById = async (id: number) => {

  return await prisma.user.findUnique({
    where: {
      id
    },
    include: {
      role: true
    }
  });

};

export const createUser = async (
  userData: CreateUserDTO
) => {

  const hashedPassword = await hashPassword(
    userData.password
  );

  return await prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword
    }
  });

};

export const updateUser = async (
  id: number,
  userData: UpdateUserDTO
) => {

  return await prisma.user.update({
    where: {
      id
    },
    data: userData
  });

};

export const deleteUser = async (
  id: number
) => {

  return await prisma.user.update({
    where: {
      id
    },
    data: {
      active: false
    }
  });

};