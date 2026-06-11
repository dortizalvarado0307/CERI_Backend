import {Request, Response} from 'express';
import prisma from '../config/db.js';


export const getAllUniversitiesBody = async () => {
    return await prisma.university_body.findMany({
        where: {
            active: true
        }
    });
}

export const getUniversityByIdBody = async (id: number) => {
    return await prisma.university_body.findUnique({
        where: {
            id: id,
            active: true
        }
    });
}


