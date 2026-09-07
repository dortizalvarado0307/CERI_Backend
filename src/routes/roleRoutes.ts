import { Router } from 'express';
import * as roleController from '../controllers/roleController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authenticate, roleController.getRoles);

export default router;