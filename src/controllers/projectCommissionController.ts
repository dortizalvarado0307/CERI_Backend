import { Request, Response } from 'express';
import * as projectComissionService from '../services/projectComissionService.js';
import type ProjectFilters from '../types/filters.js';
import { success, created, notFound, asyncHandler } from '../utils/response.js';

const parseNumberArray = (value: unknown): number[] | undefined => {
  if (!value) return undefined;
  return value.toString().split(',').map(Number);
};

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const page = req.query.page ? Number(req.query.page) : undefined;
  const limit = req.query.limit ? Number(req.query.limit) : undefined;
  const result = await projectComissionService.getAllProjectComission(page, limit);
  success(res, result);
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const projectComission = await projectComissionService.getProjectComissionById(Number(req.params.id));
  if (!projectComission) return notFound(res, 'Comisión de proyecto no encontrada');
  success(res, projectComission);
});

export const getByFilters = asyncHandler(async (req: Request, res: Response) => {
  const filters: ProjectFilters = {
    id_region: parseNumberArray(req.query.id_region),
    id_university: parseNumberArray(req.query.id_university),
    id_type_initiative: parseNumberArray(req.query.id_type_initiative),
  };
  const projectComissions = await projectComissionService.getProjectComissionByFilters(filters);
  success(res, projectComissions);
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const newProjectComission = await projectComissionService.createProjectComission(req.body);
  created(res, newProjectComission);
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const updatedProjectComission = await projectComissionService.updateProjectComission(Number(req.params.id), req.body);
  if (!updatedProjectComission) return notFound(res, 'Comisión de proyecto no encontrada');
  success(res, updatedProjectComission);
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  const deletedProjectComission = await projectComissionService.deleteProjectComission(Number(req.params.id));
  if (!deletedProjectComission) return notFound(res, 'Comisión de proyecto no encontrada');
  success(res, deletedProjectComission);
});