import prisma from '../config/db.js';

export const getAll = async () => {
  return await prisma.university_body.findMany({ where: { active: true } });
};

export const getById = async (id: number) => {
  return await prisma.university_body.findUnique({ where: { id, active: true } });
};