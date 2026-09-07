import { Request, Response } from 'express';
import { success, notFound, asyncHandler } from '../utils/response.js';

type GetAll = () => Promise<unknown>;
type GetById = (id: number) => Promise<unknown>;

export function createReadOnlyController(
  service: { getAll: GetAll; getById: GetById },
  entityName: string
) {
  return {
    getAll: asyncHandler(async (_req: Request, res: Response) => {
      const data = await service.getAll();
      success(res, data);
    }),

    getById: asyncHandler(async (req: Request, res: Response) => {
      const item = await service.getById(Number(req.params.id));
      if (!item) return notFound(res, `${entityName} no encontrado`);
      success(res, item);
    }),
  };
}