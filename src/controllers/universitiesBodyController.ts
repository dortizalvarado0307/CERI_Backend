import * as universityBodyService from '../services/universityBodyService.js';
import { createReadOnlyController } from './crudController.js';

export const { getAll, getById } = createReadOnlyController(universityBodyService, 'Universidad');