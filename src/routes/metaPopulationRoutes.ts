import {Router} from 'express';
import {getAll,
    getById,
} from '../controllers/metaPopulationController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorizePermission } from '../middlewares/permissionMiddleware.js';

const router = Router();

router.get('/', 
    authenticate,
    authorizePermission('see all meta population'),
    getAll
);

router.get('/:id',
    authenticate,
    authorizePermission('see all meta population'),
    getById
);


export default router;