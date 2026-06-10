import prisma from '../config/db.js';
import { CreateUniversityDTO } from '../dtos/university/createUniversity.js';
import { updateUniversityDTO } from '../dtos/university/updateUniversity.js';


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

