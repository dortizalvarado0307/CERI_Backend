import prisma from '../config/db.js';

export const getAll = async () => {
  return await prisma.clasification_meta_population.findMany({
    where: { active: true },
    include: { meta_population: true },
  });
};

export const getById = async (id: number) => {
  return await prisma.clasification_meta_population.findUnique({
    where: { id, active: true },
    include: { meta_population: true },
  });
};