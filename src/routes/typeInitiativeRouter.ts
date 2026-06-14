import {Router} from 'express';
import {getAll,
     getById} from '../controllers/typeInitiativeController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorizePermission } from '../middlewares/permissionMiddleware.js';

const router = Router();

router.get('/', 
    authenticate,
    authorizePermission('see all initiatives'),
    getAll
);
router.get('/:id', 
    authenticate,
    authorizePermission('see all initiatives'),
    getById
);

export default router;

