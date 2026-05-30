import jwt from 'jsonwebtoken';

export const generateToken = (
userId: number, roleId: number, permissions: (string | null)[]) => {

  return jwt.sign(
    {
      userId,
      roleId,
      permissions
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: '8h'
    }
  );

};