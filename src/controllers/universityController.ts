import { Request, Response } from 'express';
import * as universityService from '../services/universityService.js';

export const getAll = async (
  _req: Request,
  res: Response
) => {

  try {

    const universities =
      await universityService.getAllUniversities();

    return res.status(200).json({
      ok: true,
      data: universities
    });

  } catch (error) {

    return res.status(500).json({
      ok: false,
      message: 'Error obteniendo universidades'
    });

  }

};

export const getById = async (
  req: Request,
  res: Response
) => {

  try {

    const id = Number(req.params.id);

    const university =
      await universityService.getUniversityById(id);

    if (!university) {

      return res.status(404).json({
        ok: false,
        message: 'Universidad no encontrada'
      });

    }

    return res.status(200).json({
      ok: true,
      data: university
    });

  } catch (error) {

    return res.status(500).json({
      ok: false,
      message: 'Error obteniendo universidad'
    });

  }

};