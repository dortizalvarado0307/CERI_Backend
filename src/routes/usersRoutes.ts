import { Router } from 'express';

import * as userController from '../controllers/usersController.js';

import { validate } from '../middlewares/genericValidate.js';

import {
  createUserSchema
} from '../validators/users/createValidatorUser.js';

import {
  updateUserSchema
} from '../validators/users/updateValidatorUser.js';

import { authenticate } from '../middlewares/authMiddleware.js';
import { authorizePermission } from '../middlewares/permissionMiddleware.js';
const router = Router();

router.get(
  '/',
  authenticate,
  authorizePermission('See all users'),
  userController.getUsers
);

router.get(
  '/:id',
  authenticate,
  authorizePermission('See all users'),
  userController.getUser
);

router.post(
  '/',
  authenticate,
  authorizePermission('Create user'),
  validate(createUserSchema),
  userController.createUser
);

router.put(
  '/:id',
  authenticate,
  authorizePermission('Edit user'),
  validate(updateUserSchema),
  userController.updateUser
);

router.delete(
  '/:id',
  authenticate,
  authorizePermission('Delete user'),
  userController.deleteUser
);

export default router;