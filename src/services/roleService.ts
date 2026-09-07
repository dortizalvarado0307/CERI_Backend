import prisma from '../config/db.js';

export const getAllRoles = async () => {
  return await prisma.role.findMany({
    where: { active: true },
    select: {
      id: true,
      name: true,
    },
    orderBy: { id: 'asc' },
  });
};