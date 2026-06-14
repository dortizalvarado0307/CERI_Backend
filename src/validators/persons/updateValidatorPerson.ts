import { z } from 'zod';
import { onlyLettersRegex } from '../../utils/validate/validationsText.js';


export const updatePersonSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .regex(
            onlyLettersRegex,
            'El nombre solo puede contener letras y espacios'
        )
        .optional(),
    last_name: z
        .string()
        .trim()
        .min(3, 'El apellido debe tener al menos 3 caracteres')
        .regex(
            onlyLettersRegex,
            'El apellido solo puede contener letras y espacios'
        )
        .optional()
});