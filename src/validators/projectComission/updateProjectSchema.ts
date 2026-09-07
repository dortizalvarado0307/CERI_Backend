import { z } from 'zod';

export const updateProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, 'El nombre debe tener al menos 5 caracteres')
    .max(150, 'El nombre no puede exceder 150 caracteres')
    .optional(),

  general_objective: z
    .string()
    .trim()
    .min(20, 'El objetivo general debe tener al menos 20 caracteres')
    .max(2000, 'El objetivo general no puede exceder 2000 caracteres')
    .optional(),

  id_type_initiative: z
    .number()
    .int()
    .positive()
    .optional(),

  id_classification_management_area: z
    .number()
    .int()
    .positive()
    .optional(),

  id_clasification_meta_population: z
    .number()
    .int()
    .positive()
    .optional(),

  id_person_in_charge: z
    .number()
    .int()
    .positive()
    .optional(),

  id_university_body: z
    .number()
    .int()
    .positive()
    .optional(),

  id_user: z
    .number()
    .int()
    .positive()
    .optional(),

  active: z
    .boolean()
    .optional(),

  codigo: z
    .string()
    .trim()
    .max(50, 'El código no puede exceder 50 caracteres')
    .optional()
    .or(z.literal('')),

  fecha_inicio: z
    .string()
    .optional()
    .or(z.literal('')),

  fecha_fin: z
    .string()
    .optional()
    .or(z.literal('')),

  regions: z
    .array(z.number().int().positive())
    .optional(),

  universities: z
    .array(z.number().int().positive())
    .optional()
}).refine(
  (data) => {
    if (data.fecha_inicio && data.fecha_fin) {
      return new Date(data.fecha_fin) >= new Date(data.fecha_inicio);
    }
    return true;
  },
  {
    message: 'La fecha de fin no puede ser anterior a la fecha de inicio',
    path: ['fecha_fin']
  }
);