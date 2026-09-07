import prisma from '../config/db.js';

export const getAll = async () => {
  return await prisma.region.findMany({ where: { active: true } });
};

export const getById = async (id: number) => {
  return await prisma.region.findUnique({ where: { id, active: true } });
};