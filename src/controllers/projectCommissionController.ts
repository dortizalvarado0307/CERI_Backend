import {Request, Response} from 'express';
import * as projectComissionService from '../services/projectComissionService.js';
import { CreateProjectDTO } from '../dtos/projectComission/createProjectCommission.js';
import { UpdateProjectDTO } from '../dtos/projectComission/updateProjectComission.js';
import ProjectFilters from '../types/filters.js';


export const getAll = async (
    _req: Request,
    res: Response
) => {
    try {
        const projectComissions = await projectComissionService.getAllProjectComission();
        return res.status(200).json({
            ok: true,
            data: projectComissions
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error obteniendo comisiones de proyectos'
        });
    }
}

export const getById = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);
        const projectComission = await projectComissionService.getProjectComissionById(id);
        if (!projectComission) {
            return res.status(404).json({
                ok: false,
                message: 'Comisión de proyecto no encontrada'
            });
        }
        return res.status(200).json({
            ok: true,
            data: projectComission
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error obteniendo comisión de proyecto'
        });
    }
}

export const getByFilters = async (
  req: Request,
  res: Response
) => {
  try {

    const filters: ProjectFilters = {
      id_region: req.query.id_region
        ? req.query.id_region.toString().split(',').map(Number)
        : undefined,

      id_university: req.query.id_university
        ? req.query.id_university.toString().split(',').map(Number)
        : undefined,

      id_type_initiative: req.query.id_type_initiative
        ? req.query.id_type_initiative.toString().split(',').map(Number)
        : undefined
    };

    const projectComissions =
      await projectComissionService
        .getProjectComissionByFilters(filters);

    return res.status(200).json({
      ok: true,
      data: projectComissions
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      ok: false,
      message:
        'Error obteniendo comisiones de proyectos por filtros'
    });

  }
};


export const create = async (
    req: Request,
    res: Response
) => {
    try {
        const projectComissionData: CreateProjectDTO = req.body;
        const newProjectComission = await projectComissionService.createProjectComission(projectComissionData);
        return res.status(201).json({
            ok: true,
            data: newProjectComission
        });
    }   
    catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error creando comisión de proyecto'
        });
    }
}


export const update = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);
        const projectComissionData: UpdateProjectDTO = req.body;
        const updatedProjectComission = await projectComissionService.updateProjectComission(id, projectComissionData);
        if (!updatedProjectComission) {
            return res.status(404).json({
                ok: false,
                message: 'Comisión de proyecto no encontrada'
            });
        }

        return res.status(200).json({
            ok: true,   
            data: updatedProjectComission
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error actualizando comisión de proyecto'
        });
    }

}


export const remove = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);
        const deletedProjectComission = await projectComissionService.deleteProjectComission(id);
        if (!deletedProjectComission) {
            return res.status(404).json({
                ok: false,
                message: 'Comisión de proyecto no encontrada'
            });
        }
        return res.status(200).json({
            ok: true,
            data: deletedProjectComission
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error eliminando comisión de proyecto'
        });
    }
}
