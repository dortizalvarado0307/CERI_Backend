import { z } from 'zod';

export const updateUserSchema = z.object({

  name: z.string().min(3).regex(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
      'El nombre solo puede contener letras y espacios').optional(),

  email: z.email().optional(),

  password: z.string().min(6).optional(),

  id_role: z.number().int().positive().optional(),

  active: z.boolean().optional()

});