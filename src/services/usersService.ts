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

export const getAllUsers = async (
  page?: number,
  limit?: number
) => {

  const select = {
    id: true,
    email: true,
    name: true,
    active: true,
    id_role: true,
    role: true
  };

  if (page && limit) {
    const [data, total] = await Promise.all([
      prisma.user.findMany({
        select,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: 'desc' }
      }),
      prisma.user.count()
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  return await prisma.user.findMany({ select });

};

export const getUserById = async (id: number) => {

  return await prisma.user.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      email: true,
      name: true,
      active: true,
      id_role: true,
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

  const data: UpdateUserDTO = { ...userData };

  if (data.password) {
    data.password = await hashPassword(data.password);
  }

  return await prisma.user.update({
    where: {
      id
    },
    data
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