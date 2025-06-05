import express from 'express';
import multer from 'multer';
import { validateFile } from '../utils/validateFile.js';
import { processPDF } from '../controllers/analysisController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });

router.post('/upload', upload.single('file'), validateFile, processPDF);

export default router;
