import prisma from '../config/db.js';

export const getAll = async () => {
  return await prisma.classification_management_area.findMany({
    where: { active: true },
    include: { management_area: true },
  });
};

export const getById = async (id: number) => {
  return await prisma.classification_management_area.findUnique({
    where: { id, active: true },
    include: { management_area: true },
  });
};