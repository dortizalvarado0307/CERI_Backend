import {Router} from 'express';
import {
    getAll,
    getById,
    create,
    update,
    remove
} from '../controllers/personInChargeController.js';

import {authenticate} from '../middlewares/authMiddleware.js';
import {authorizePermission} from '../middlewares/permissionMiddleware.js';

const router = Router();

router.get('/', 
    authenticate,
    authorizePermission('see all person in charge'),
    getAll);
    
router.get('/:id', 
    authenticate,
    authorizePermission('see all person in charge'),
    getById);
router.post('/', 
    authenticate,
    authorizePermission('create person in charge'),
    create);
router.put('/:id', 
    authenticate,
    authorizePermission('edit person in charge'),
    update);
router.delete('/:id', 
    authenticate,
    authorizePermission('delete person in charge'),
    remove);

export default router;