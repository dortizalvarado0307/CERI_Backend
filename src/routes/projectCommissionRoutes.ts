import {Router} from 'express';
import * as projectComissionController from '../controllers/projectCommissionController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorizePermission } from '../middlewares/permissionMiddleware.js';
import { validate } from '../middlewares/genericValidate.js';
import { createProjectSchema } from '../validators/projectComission/createProjectSchema.js';
import { updateProjectSchema } from '../validators/projectComission/updateProjectSchema.js';

const router = Router();

router.get('/',
    authenticate,
    authorizePermission('see all projects commissions'),
    projectComissionController.getAll
);

router.get('/filters', 
    authenticate,
    authorizePermission('see all projects commissions'),
    projectComissionController.getByFilters
);
router.get('/:id', 
    authenticate,
    authorizePermission('see all projects commissions'),
    projectComissionController.getById
);
router.post('/', 
    authenticate,
    authorizePermission('create projects commissions university'),
    validate(createProjectSchema),
    projectComissionController.create
);
router.put('/:id', 
    authenticate,
    authorizePermission('edit projects commissions university'),
    validate(updateProjectSchema),
    projectComissionController.update
);
router.delete('/:id', 
    authenticate,
    authorizePermission('delete projects commissions university'),
    projectComissionController.remove
);

export default router;