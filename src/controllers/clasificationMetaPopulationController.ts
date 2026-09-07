import * as clasificationMetaPopulationService from '../services/clasificationMetaPopulationService.js';
import { createReadOnlyController } from './crudController.js';

export const { getAll, getById } = createReadOnlyController(clasificationMetaPopulationService, 'Clasificación de población meta');