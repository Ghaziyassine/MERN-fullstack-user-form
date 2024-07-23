import express from 'express';
import { createUser, getAllUsers, getUserById, deleteUser, updateUser } from '../controllers/userController.js';
import upload from '../middlewares/upload.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/users',auth, upload.single('file'), createUser); 
router.get('/users',auth, getAllUsers);
router.get('/users/:id', getUserById);
router.delete('/users/:id',auth, deleteUser);
router.put('/users/:id',auth, upload.single('file'), updateUser);

export default router;
