import {Router} from 'express';
import {getAll,
    getById,
} from '../controllers/clasificationMetaPopulationController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorizePermission } from '../middlewares/permissionMiddleware.js';


const router = Router();

router.get('/',
    authenticate,
    authorizePermission('see all clasification meta population'),
    getAll
);


router.get('/:id',
    authenticate,
    authorizePermission('see all clasification meta population'),
    getById
);

export default router;