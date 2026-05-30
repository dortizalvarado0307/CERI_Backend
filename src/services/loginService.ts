import prisma from '../config/db.js';
import { comparePassword } from '../utils/password/password.js';

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
    throw new Error('Usuario no existe');
  }

  const validPassword =
    await comparePassword(
      password,
      user.password
    );

  if (!validPassword) {
    throw new Error('Credenciales inválidas');
  }

  return user;

};