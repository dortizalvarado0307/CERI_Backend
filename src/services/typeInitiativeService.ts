import prisma from '../config/db.js';


export const getTypeInitiative = async () => {

    return await prisma.type_initiative.findMany({
    where: {
      active: true
    }
    });
};

export const getTypeInitiativeById = async (id: number) => {
    return await prisma.type_initiative.findUnique({
        where: {
            id: id,
            active: true
        }
    });
};