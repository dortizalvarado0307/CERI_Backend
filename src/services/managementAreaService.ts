 import prisma from '../config/db.js';


 export const getAllManagementAreas = async () => {

    return await prisma.management_area.findMany({
        where: {
            active: true
        }
    });

};

export const getManagementAreaById = async (id: number) => {
    return await prisma.management_area.findUnique({
        where: {
            id: id,
            active: true
        }
    });
}
