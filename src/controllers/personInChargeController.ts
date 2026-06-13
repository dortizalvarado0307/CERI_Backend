import {Request, Response} from 'express';
import {getAllPersonsInCharge,
    getPersonInChargeById,
    createPersonInCharge,
    updatePersonInCharge,
    deletePersonInCharge
} from '../services/personInChargeService.js';


export const getAll = async (
    _req: Request,
    res: Response
) => {
    try {
        const personsInCharge =
            await getAllPersonsInCharge();
        return res.status(200).json({
            ok: true,
            data: personsInCharge
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error obteniendo personas a cargo'
        });
    }
};


export const getById = async (
    req: Request,
    res: Response

) => {
    try {
        const id = Number(req.params.id);
        const personInCharge = await getPersonInChargeById(id);
        if (!personInCharge) {
            return res.status(404).json({
                ok: false,
                message: 'Persona a cargo no encontrada'
            });
        }
        return res.status(200).json({
            ok: true,
            data: personInCharge
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error obteniendo persona a cargo'
        });
    }
};


export const create = async (
    req: Request,
    res: Response
) => {
    try {
       const personInChargeData = await createPersonInCharge(req.body);
        return res.status(201).json({
            ok: true,
            data: personInChargeData
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error creando persona a cargo'
        });
    }
};


export const update = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);
        const personInChargeData = await updatePersonInCharge(id, req.body);
        if (!personInChargeData) {
            return res.status(404).json({
                ok: false,
                message: 'Persona a cargo no encontrada'
            });
        }

        return res.status(200).json({
            ok: true,
            data: personInChargeData,
            message: 'Persona a cargo actualizada correctamente'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,

            message: 'Error actualizando persona a cargo'
        });
    }   
};

export const remove = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);
        const personInChargeData = await deletePersonInCharge(id);
        if (!personInChargeData) {
            return res.status(404).json({
                ok: false,
                message: 'Persona a cargo no encontrada'
            });
        }
        return res.status(200).json({
            ok: true,
            data: personInChargeData,
            message: 'Persona a cargo eliminada correctamente'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error eliminando persona a cargo'
        });
    }
};
