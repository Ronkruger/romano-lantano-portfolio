import { v2 as cloudinary } from 'cloudinary';
import { Router } from 'express';
import multer from 'multer';
import { env, requireServerSecret } from '../config/env.js';
import { requireAdmin } from '../middleware/auth.js';

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

    cloudinary.config({
      cloud_name: requireServerSecret(env.cloudinaryCloudName, 'CLOUDINARY_CLOUD_NAME'),
      api_key: requireServerSecret(env.cloudinaryApiKey, 'CLOUDINARY_API_KEY'),
      api_secret: requireServerSecret(env.cloudinaryApiSecret, 'CLOUDINARY_API_SECRET'),
    });

    const uploadResult = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: env.cloudinaryFolder,
          resource_type: 'image',
          transformation: [{ width: 1600, crop: 'limit' }, { quality: 'auto', fetch_format: 'auto' }],
        },
        (error, result) => {
          if (error || !result) {
            reject(error ?? new Error('Cloudinary upload failed.'));
            return;
          }

          resolve({ secure_url: result.secure_url, public_id: result.public_id });
        },
      );

      stream.end(request.file?.buffer);
    });

    response.status(201).json({ imageUrl: uploadResult.secure_url, imagePublicId: uploadResult.public_id });
  } catch (error) {
    next(error);
  }
});