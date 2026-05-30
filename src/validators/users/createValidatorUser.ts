import { z } from 'zod';
import { onlyLettersRegex } from '../../utils/validate/validationsText.js';
export const createUserSchema = z.object({

  name: z
    .string()
    .trim()
    .min(10, 'El nombre debe tener al menos 10 caracteres')
    .regex(
      onlyLettersRegex,
      'El nombre solo puede contener letras y espacios'
    ),

  email: z
    .email('Correo inválido'),

  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),

  id_role: z
    .number()
    .int()
    .positive()

});