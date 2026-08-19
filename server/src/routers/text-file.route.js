import { Router } from 'express';
// import { validateRequest } from '../middlewares/validate.middleware.js';
import * as textFile from '../controller/text-file.controller.js';
import upload from '../middlewares/multer.middleware.js';

const router = Router();

router.post('/analyze-image', upload.single('image'), textFile.analyzeImageController);

export default router;