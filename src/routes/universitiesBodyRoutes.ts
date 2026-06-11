import { Router } from 'express';
import{
    getAll,
    getById
} from '../controllers/universitiesBodyController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorizePermission } from '../middlewares/permissionMiddleware.js';

const router = Router();

router.get(
    '/',
    authenticate,
    authorizePermission('see all university body'),
    getAll
);


router.get(
    '/:id',
    authenticate,
    authorizePermission('see all university body'),
    getById
);  
export default router;

