import { Router } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { env, requireServerSecret } from '../config/env.js';
import { requireAdmin } from '../middleware/auth.js';
import { createS3Client, getPublicS3Url, uploadBufferToS3 } from '../utils/s3.js';

const s3Client = createS3Client();

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

    const bucketName = requireServerSecret(env.s3BucketName, 'S3_BUCKET_NAME');
    const folder = env.s3ProjectsFolder;
    
    // Optimize image with sharp (resize, quality, format)
    const optimizedImageBuffer = await sharp(request.file.buffer)
      .resize(1600, 1600, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 80 })
      .toBuffer();

    // Generate unique key with timestamp
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const key = `${folder}/${timestamp}-${randomStr}.webp`;

    await uploadBufferToS3({
      client: s3Client,
      bucketName,
      key,
      body: optimizedImageBuffer,
      contentType: 'image/webp',
    });

    const imageUrl = getPublicS3Url({ bucketName, key });
    const imagePublicId = key;

    response.status(201).json({ imageUrl, imagePublicId });
  } catch (error) {
    next(error);
  }
});