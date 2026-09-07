import * as typeInitiativeService from '../services/typeInitiativeService.js';
import { createReadOnlyController } from './crudController.js';

export const { getAll, getById } = createReadOnlyController(typeInitiativeService, 'Tipo de iniciativa');