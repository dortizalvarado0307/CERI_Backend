import { Request, Response } from 'express';
import * as universityBodyService from '../services/universityBodyService.js';

export const getAll = async (
    _req: Request,
    res: Response
) => {
    try {
        const universitiesBody = await universityBodyService.getAllUniversitiesBody();
        return res.status(200).json({
            ok: true,
            data: universitiesBody
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error obteniendo universidades'
        });
    }
};


export const getById = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);
        const universityBody = await universityBodyService.getUniversityByIdBody(id);
        if (!universityBody) {
            return res.status(404).json({
                ok: false,
                message: 'Universidad no encontrada'
            });
        }
        return res.status(200).json({
            ok: true,
            data: universityBody
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error obteniendo universidad'
        });
    }
};



