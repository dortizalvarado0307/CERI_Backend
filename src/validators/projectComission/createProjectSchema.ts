import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, 'El nombre debe tener al menos 5 caracteres')
    .max(150, 'El nombre no puede exceder 150 caracteres'),

  general_objective: z
    .string()
    .trim()
    .min(20, 'El objetivo general debe tener al menos 20 caracteres')
    .max(2000, 'El objetivo general no puede exceder 2000 caracteres'),

  id_type_initiative: z
    .number()
    .int('El tipo de iniciativa debe ser un número entero')
    .positive('El tipo de iniciativa debe ser positivo'),

  id_classification_management_area: z
    .number()
    .int('El área de gestión debe ser un número entero')
    .positive('El área de gestión debe ser positiva'),

  id_clasification_meta_population: z
    .number()
    .int('La meta población debe ser un número entero')
    .positive('La meta población debe ser positiva'),

  id_person_in_charge: z
    .number()
    .int('La persona a cargo debe ser un número entero')
    .positive('La persona a cargo debe ser positiva'),

  id_university_body: z
    .number()
    .int('La unidad universitaria debe ser un número entero')
    .positive('La unidad universitaria debe ser positiva'),

  id_user: z
    .number()
    .int('El usuario debe ser un número entero')
    .positive('El usuario debe ser positivo'),

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
    .min(1, 'Debe seleccionar al menos una región'),

  universities: z
    .array(z.number().int().positive())
    .min(1, 'Debe seleccionar al menos una universidad')
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