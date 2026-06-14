import {Request, Response} from 'express';
import * as ManagementAreaService from '../services/managementAreaService.js';

export const getAll = async (
    _req: Request,
    res: Response
) => {
    try {
        const managementAreas = await ManagementAreaService.getAllManagementAreas();
        return res.status(200).json({
            ok: true,
            data: managementAreas
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error obteniendo áreas de gestión'
        });
    }
};


export const getById = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);
        const managementArea = await ManagementAreaService.getManagementAreaById(id);
        if (!managementArea) {
            return res.status(404).json({
                ok: false,
                message: 'Área de gestión no encontrada'
            });
        }
        return res.status(200).json({
            ok: true,
            data: managementArea
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error obteniendo área de gestión'
        });
    }   
}

