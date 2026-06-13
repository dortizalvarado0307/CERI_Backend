 import prisma from '../config/db.js';
import { CreatePersonInChargeDTO } from '../dtos/persons/createPersonInCharge.js';
import { UpdatePersonInChargeDTO } from '../dtos/persons/updatePersonInCharge.js';


 export const getAllPersonsInCharge = async () => {

    return await prisma.person_in_charge.findMany({
    where: {
      active: true
    }
    });

};

export const getPersonInChargeById = async (id: number) => {
    return await prisma.person_in_charge.findUnique({
        where: {
            id: id,
            active: true
        }
    });
};

export const createPersonInCharge = async (personInChargeData: CreatePersonInChargeDTO) => {
    return await prisma.person_in_charge.create({
        data: {
            name: personInChargeData.name,
            lastname: personInChargeData.lastname,
            contact: personInChargeData.contact  
        }
    });
}

export const updatePersonInCharge = async (id: number, personInChargeData: UpdatePersonInChargeDTO) => {
    return await prisma.person_in_charge.update({
        where: {
            id: id,
            active: true
        },
        data: {
            name: personInChargeData.name,
            lastname: personInChargeData.lastname,
            contact: personInChargeData.contact,
            active: personInChargeData.active
        }
    });
}

export const deletePersonInCharge = async (id:number) => {
    return await prisma.person_in_charge.update({
        where :{
            id : id,
            active:true
        },
        data:{

            active:false
        }
    })
}


