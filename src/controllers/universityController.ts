import * as universityService from '../services/universityService.js';
import { createReadOnlyController } from './crudController.js';

export const { getAll, getById } = createReadOnlyController(universityService, 'Universidad');