import prisma from '../config/db.js';


export const getClasificationMetaPopulation = async () => {
    return await prisma.clasification_meta_population.findMany({
    where: {
      active: true
    },
    include: {
      meta_population: true
    }});
}

export const getClasificationMetaPopulationById = async (id: number) => {
    return await prisma.clasification_meta_population.findUnique({
        where: {
            id: id
        },
    include: {
      meta_population: true
    }});
}