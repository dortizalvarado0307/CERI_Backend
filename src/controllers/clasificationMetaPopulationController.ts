import {Request, Response} from 'express';
import * as clasificationMetaPopulationService from '../services/clasificationMetaPopulationService.js';

export const getAll = async (
    _req: Request,
    res: Response
) => {
    try {
        const clasificationMetaPopulations = await clasificationMetaPopulationService.getClasificationMetaPopulation();
        return res.status(200).json({
            ok: true,
            data: clasificationMetaPopulations
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error obteniendo clasificaciones de meta poblaciones'
        });
    }
};

export const getById = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);
        const clasificationMetaPopulation = await clasificationMetaPopulationService.getClasificationMetaPopulationById(id);
        if (!clasificationMetaPopulation) {
            return res.status(404).json({
                ok: false,
                message: 'Clasificación de meta población no encontrada'
            });
        }
        return res.status(200).json({
            ok: true,
            data: clasificationMetaPopulation
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error obteniendo clasificación de meta población'
        });
    }
};