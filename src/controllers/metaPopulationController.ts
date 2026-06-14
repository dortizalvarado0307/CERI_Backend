import {Request, Response} from 'express';
import * as metaPopulationService from '../services/metaPopulationService.js';

export const getAll = async (
    _req: Request,
    res: Response
) => {
    try {
        const metaPopulations = await metaPopulationService.getAllMetaPopulation();
        return res.status(200).json({
            ok: true,
            data: metaPopulations
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error obteniendo meta poblaciones'
        });
    }
}


export const getById = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);
        const metaPopulation = await metaPopulationService.getMetaPopulationById(id);
        if (!metaPopulation) {
            return res.status(404).json({
                ok: false,
                message: 'Meta población no encontrada'
            });
        }
        return res.status(200).json({
            ok: true,
            data: metaPopulation
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error obteniendo meta población'
        });
    }
}
