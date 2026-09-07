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
      expiresIn: (process.env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn']) || '8h'
    }
  );

};