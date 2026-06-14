import {Request, Response} from 'express';
import * as typeInitiativeService from '../services/typeInitiativeService.js';

export const getAll = async (
    _req: Request,
    res: Response
) => {
    try {
        const typeInitiative = await typeInitiativeService.getTypeInitiative();
        return res.status(200).json({
            ok: true,
            data: typeInitiative
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error obteniendo tipos de iniciativa'
        });
    }
}

export const getById = async(
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);
        const typeInitiative = await typeInitiativeService.getTypeInitiativeById(id);
        if (!typeInitiative) {
            return res.status(404).json({
                ok: false,
                message: 'Tipo de iniciativa no encontrado'
            });
        }
        return res.status(200).json({
            ok: true,
            data: typeInitiative
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error obteniendo tipo de iniciativa'
        });
    }
}
