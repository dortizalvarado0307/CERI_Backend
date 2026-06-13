import { Router } from 'express';

import {
  getAll,
  getById
} from '../controllers/regionController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorizePermission } from '../middlewares/permissionMiddleware.js';

const router = Router();
router.get(
  '/',
  authenticate,
  authorizePermission('see all region'),
  getAll
);

router.get(
    '/:id',
    authenticate,
    authorizePermission('see all region'),
    getById
);

export default router;
