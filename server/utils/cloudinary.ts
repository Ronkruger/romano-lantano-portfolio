import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';
import { randomUUID } from 'node:crypto';
import { env, requireServerSecret } from '../config/env.js';

export const uploadToCloudinary = (buffer: Buffer, folder: string, resourceType: 'image' | 'raw', extension = '') => {
  cloudinary.config({
    cloud_name: requireServerSecret(env.cloudinaryCloudName, 'CLOUDINARY_CLOUD_NAME'),
    api_key: requireServerSecret(env.cloudinaryApiKey, 'CLOUDINARY_API_KEY'),
    api_secret: requireServerSecret(env.cloudinaryApiSecret, 'CLOUDINARY_API_SECRET'),
    secure: true,
  });
  return new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({
      folder, resource_type: resourceType, public_id: `${randomUUID()}${extension}`,
      overwrite: false, timeout: 60000,
    }, (error, result) => {
      if (error) reject(error);
      else if (result) resolve(result);
      else reject(new Error('Cloudinary returned no upload result.'));
    });
    stream.on('error', reject);
    stream.end(buffer);
  });
};
