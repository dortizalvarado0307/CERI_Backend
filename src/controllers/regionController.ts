import {Request, Response} from 'express';
import * as regionService from '../services/regionService.js';


export const getAll = async (
    _req: Request,
    res: Response
) => {
    try {
        const regions = await regionService.getAllRegions();
        return res.status(200).json({
            ok: true,
            data: regions
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error obteniendo regiones'
        });
    }
}


export const getById = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);
        const region = await regionService.getRegionById(id);
        if (!region) {
            return res.status(404).json({
                ok: false,
                message: 'Región no encontrada'
            });
        }
        return res.status(200).json({
            ok: true,
            data: region
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error obteniendo región'
        });
    }
}