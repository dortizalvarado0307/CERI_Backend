import prisma from '../config/db.js';

export const getAllUniversities = async () => {

    return await prisma.university.findMany({
    where: {
      active: true
    }
    
  });

};

export const getUniversityById = async (id: number) => {

    return await prisma.university.findUnique({
        where: {
            id: id,
            active: true


        }
    });
}

