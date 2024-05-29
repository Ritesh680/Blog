import express from 'express';
import userController from './user.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/me',authMiddleware.checkAuthenticated, userController.getUserDetails);

module.exports = router;