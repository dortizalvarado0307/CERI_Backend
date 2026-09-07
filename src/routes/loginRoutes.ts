import { Router } from 'express';
import { login } from '../controllers/loginController.js';
import { validate } from '../middlewares/genericValidate.js';
import { loginSchema } from '../validators/auth/loginSchema.js';

const router = Router();

router.post(
  '/login',
  validate(loginSchema),
  login
);

export default router;