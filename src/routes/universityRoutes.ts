import { Router } from 'express';

import {
  getAll,
  getById
} from '../controllers/universityController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorizePermission } from '../middlewares/permissionMiddleware.js';

const router = Router();

router.get(
  '/',
  authenticate,
  authorizePermission('see all university'),
  getAll
);

router.get(
  '/:id',
  authenticate,
  authorizePermission('see all university'),
  getById
);

export default router;