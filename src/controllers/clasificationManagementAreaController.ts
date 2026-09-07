import * as clasificationManagementAreaService from '../services/clasificationManagementAreaService.js';
import { createReadOnlyController } from './crudController.js';

export const { getAll, getById } = createReadOnlyController(clasificationManagementAreaService, 'Clasificación de área de gestión');