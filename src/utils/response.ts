import { Request, Response, NextFunction } from 'express';

export const success = (res: Response, data: unknown, status = 200) =>
  res.status(status).json({ ok: true, data });

export const created = (res: Response, data: unknown, message?: string) =>
  res.status(201).json({ ok: true, data, ...(message ? { message } : {}) });

export const error = (res: Response, message: string, status = 500) =>
  res.status(status).json({ ok: false, message });

export const notFound = (res: Response, message: string) =>
  res.status(404).json({ ok: false, message });

export const ok = (res: Response, message: string) =>
  res.status(200).json({ ok: true, message });

type AsyncFn = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

export const asyncHandler =
  (fn: AsyncFn) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      console.error(err);
      error(res, 'Error interno del servidor');
    }
  };