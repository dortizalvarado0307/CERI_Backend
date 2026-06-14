import {Request, Response} from 'express';
import * as ClasificationManagementAreaService from '../services/clasificationManagementAreaService.js';

export const getAll = async (
    _req: Request,
    res: Response
) => {
    try {
        const clasificationManagementAreas = await ClasificationManagementAreaService.getAllClasificationManagementAreas();
        return res.status(200).json({
            ok: true,
            data: clasificationManagementAreas
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error obteniendo clasificaciones de áreas de gestión'
        });
    }
};

export const getById = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);
        const clasificationManagementArea = await ClasificationManagementAreaService.getClasificationManagementAreaById(id);
        if (!clasificationManagementArea) {
            return res.status(404).json({
                ok: false,
                message: 'Clasificación de área de gestión no encontrada'
            });
        }
        return res.status(200).json({
            ok: true,
            data: clasificationManagementArea
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error obteniendo clasificación de área de gestión'
        });
    }
}