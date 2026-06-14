 import prisma from '../config/db.js';



 export const getAllClasificationManagementAreas = async () => {

    return await prisma.classification_management_area.findMany({
        where: {
            active: true
        },
        include : {
            management_area : true
        }
    });
};

export const getClasificationManagementAreaById = async (id: number) => {
    return await prisma.classification_management_area.findUnique({
        where: {
            id: id,
            active: true
        },
        include : {
            management_area : true
        }
    });
}