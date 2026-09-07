import { Request, Response } from 'express';
import {
  getAllPersonsInCharge,
  getPersonInChargeById,
  createPersonInCharge,
  updatePersonInCharge,
  deletePersonInCharge,
} from '../services/personInChargeService.js';
import { success, created, error, notFound, ok, asyncHandler } from '../utils/response.js';

export const getAll = asyncHandler(async (_req: Request, res: Response) => {
  const personsInCharge = await getAllPersonsInCharge();
  success(res, personsInCharge);
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const personInCharge = await getPersonInChargeById(Number(req.params.id));
  if (!personInCharge) return notFound(res, 'Persona a cargo no encontrada');
  success(res, personInCharge);
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const personInChargeData = await createPersonInCharge(req.body);
  created(res, personInChargeData);
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const personInChargeData = await updatePersonInCharge(Number(req.params.id), req.body);
  if (!personInChargeData) return notFound(res, 'Persona a cargo no encontrada');
  success(res, personInChargeData);
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  const personInChargeData = await deletePersonInCharge(Number(req.params.id));
  if (!personInChargeData) return notFound(res, 'Persona a cargo no encontrada');
  ok(res, 'Persona a cargo eliminada correctamente');
});