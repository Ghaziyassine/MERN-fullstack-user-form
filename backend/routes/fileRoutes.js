import express from 'express';
import { getImageById } from '../controllers/fileController.js';

const router = express.Router();

router.get('/image/:id', getImageById);

export default router;
