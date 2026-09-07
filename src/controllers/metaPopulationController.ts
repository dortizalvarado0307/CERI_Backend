import * as metaPopulationService from '../services/metaPopulationService.js';
import { createReadOnlyController } from './crudController.js';

export const { getAll, getById } = createReadOnlyController(metaPopulationService, 'Población meta');