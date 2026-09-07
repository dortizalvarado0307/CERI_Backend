import prisma from '../config/db.js';

export const getAll = async () => {
  return await prisma.management_area.findMany({ where: { active: true } });
};

export const getById = async (id: number) => {
  return await prisma.management_area.findUnique({ where: { id, active: true } });
};