import { Router } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { env } from '../config/env.js';
import { requireAdmin } from '../middleware/auth.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import { rateLimit } from 'express-rate-limit';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_request, file, callback) => {
    if (!file.mimetype.startsWith('image/')) {
      callback(new Error('Only image uploads are allowed.'));
      return;
    }

    callback(null, true);
  },
});

export const uploadsRouter = Router();

uploadsRouter.post('/', requireAdmin, upload.single('image'), async (request, response, next) => {
  try {
    if (!request.file) {
      response.status(400).json({ message: 'Choose an image to upload.' });
      return;
    }

    
    // Optimize image with sharp (resize, quality, format)
    const optimizedImageBuffer = await sharp(request.file.buffer)
      .resize(1600, 1600, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 80 })
      .toBuffer();

    const result = await uploadToCloudinary(optimizedImageBuffer, env.cloudinaryProjectsFolder, 'image');
    const imageUrl = result.secure_url;
    const imagePublicId = result.public_id;

    response.status(201).json({ imageUrl, imagePublicId });
  } catch (error) {
    next(error);
  }
});

export const attachmentsRouter = Router();
attachmentsRouter.post('/', rateLimit({ windowMs: 60 * 60 * 1000, limit: 5,
  message: { message: 'Too many attachments. Please try again later.' } }),
  multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024, files: 1 } }).single('file'),
  async (request, response, next) => {
    try {
      const file = request.file;
      if (!file) { response.status(400).json({ message: 'Choose an attachment.' }); return; }
      const isPdf = file.mimetype === 'application/pdf' && file.buffer.subarray(0, 5).toString() === '%PDF-';
      if (!isPdf && !['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
        response.status(400).json({ message: 'Only PDF, JPEG, PNG, and WebP attachments are allowed.' }); return;
      }
      const body = isPdf ? file.buffer : await sharp(file.buffer).resize(1600, 1600, { fit: 'inside', withoutEnlargement: true }).webp().toBuffer();
      const result = await uploadToCloudinary(body, env.cloudinaryAttachmentsFolder, isPdf ? 'raw' : 'image', isPdf ? '.pdf' : '');
      response.status(201).json({ url: result.secure_url });
    } catch (error) { next(error); }
  });
