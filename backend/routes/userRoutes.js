import express from 'express';
import { createUser, getAllUsers, getUserById, deleteUser, updateUser } from '../controllers/userController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post('/users', upload.single('file'), createUser);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', upload.single('file'), updateUser);

export default router;
