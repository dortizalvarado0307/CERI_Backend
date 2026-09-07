import * as managementAreaService from '../services/managementAreaService.js';
import { createReadOnlyController } from './crudController.js';

export const { getAll, getById } = createReadOnlyController(managementAreaService, 'Área de gestión');