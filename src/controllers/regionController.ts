import * as regionService from '../services/regionService.js';
import { createReadOnlyController } from './crudController.js';

export const { getAll, getById } = createReadOnlyController(regionService, 'Región');