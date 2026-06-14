import {Router} from 'express';
import {
    getAll,
    getById
} from '../controllers/clasificationManagementAreaController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorizePermission } from '../middlewares/permissionMiddleware.js';

const router = Router();

router.get('/',
     authenticate, 
     authorizePermission('see all classification management area'), 
     getAll
);

router.get('/:id',
     authenticate, 
     authorizePermission('see all classification management area'), 
     getById
);


export default router;