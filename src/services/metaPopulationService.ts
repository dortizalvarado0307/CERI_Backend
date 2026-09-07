import prisma from '../config/db.js';

export const getAll = async () => {
  return await prisma.meta_population.findMany({ where: { active: true } });
};

export const getById = async (id: number) => {
  return await prisma.meta_population.findUnique({ where: { id, active: true } });
};