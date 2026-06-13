import prisma from '../config/db.js';


export const getAllRegions = async () => {

    return await prisma.region.findMany({
    where: {
      active: true
    }
    });

};

export const getRegionById = async (id: number) => {
    return await prisma.region.findUnique({
        where: {
            id: id,
            active: true
        }
    });
};
