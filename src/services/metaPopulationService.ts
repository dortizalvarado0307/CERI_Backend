import prisma from '../config/db.js';

export const getAllMetaPopulation = async () => {
    return await prisma.meta_population.findMany({
    where: {
      active: true
    }
    });
}

export const getMetaPopulationById = async (id: number) => {
    return await prisma.meta_population.findUnique({
        where: {
            id: id
        }
    });
}

