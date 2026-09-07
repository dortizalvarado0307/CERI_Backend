import prisma from '../config/db.js';

export const getAll = async () => {
  return await prisma.type_initiative.findMany({ where: { active: true } });
};

export const getById = async (id: number) => {
  return await prisma.type_initiative.findUnique({ where: { id, active: true } });
};