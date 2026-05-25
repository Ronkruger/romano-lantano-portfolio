import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';

const settingsUpdateSchema = z.object({
  name: z.string().trim().min(1).max(100),
  title: z.string().trim().min(1).max(200),
  location: z.string().trim().min(1).max(100),
  email: z.string().trim().email(),
  intro: z.string().trim().max(500).optional().default(''),
  githubUrl: z.string().url().optional().default(''),
  linkedinUrl: z.string().url().optional().default(''),
  facebookUrl: z.string().url().optional().default(''),
});

export const settingsRouter = Router();

// Public: get site settings for the frontend
settingsRouter.get('/', async (_request, response, next) => {
  try {
    const settings = await prisma.siteSettings.upsert({
      where: { id: 'singleton' },
      update: {},
      create: { id: 'singleton' },
    });
    response.json({ settings });
  } catch (error) {
    next(error);
  }
});

// Admin: update site settings
export const adminSettingsRouter = Router();
adminSettingsRouter.use(requireAdmin);

adminSettingsRouter.get('/', async (_request, response, next) => {
  try {
    const settings = await prisma.siteSettings.upsert({
      where: { id: 'singleton' },
      update: {},
      create: { id: 'singleton' },
    });
    response.json({ settings });
  } catch (error) {
    next(error);
  }
});

adminSettingsRouter.put('/', async (request, response, next) => {
  try {
    const input = settingsUpdateSchema.parse(request.body);
    const settings = await prisma.siteSettings.upsert({
      where: { id: 'singleton' },
      update: input,
      create: { id: 'singleton', ...input },
    });
    response.json({ settings });
  } catch (error) {
    next(error);
  }
});

// Admin: upload resume
adminSettingsRouter.post('/resume', async (request, response, next) => {
  try {
    const multer = (await import('multer')).default;
    const { v2: cloudinary } = await import('cloudinary');
    const { env } = await import('../config/env.js');

    cloudinary.config({
      cloud_name: env.cloudinaryCloudName,
      api_key: env.cloudinaryApiKey,
      api_secret: env.cloudinaryApiSecret,
    });

    const upload = multer({
      storage: multer.memoryStorage(),
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB for PDFs
      fileFilter: (_req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
          cb(null, true);
        } else {
          cb(new Error('Only PDF files are allowed.'));
        }
      },
    }).single('resume');

    upload(request, response, async (uploadError) => {
      if (uploadError) {
        response.status(400).json({ message: uploadError.message });
        return;
      }

      if (!request.file) {
        response.status(400).json({ message: 'No file provided.' });
        return;
      }

      try {
        // Get current settings to delete old resume if exists
        const current = await prisma.siteSettings.findUnique({ where: { id: 'singleton' } });
        if (current?.resumePublicId) {
          await cloudinary.uploader.destroy(current.resumePublicId, { resource_type: 'raw' }).catch(() => {});
        }

        // Upload new resume
        const result = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: `${env.cloudinaryFolder}/resume`,
              resource_type: 'raw',
              public_id: 'Lantano_Romano_resume',
              format: 'pdf',
              overwrite: true,
            },
            (error, result) => {
              if (error || !result) reject(error ?? new Error('Upload failed'));
              else resolve({ secure_url: result.secure_url, public_id: result.public_id });
            },
          );
          stream.end(request.file!.buffer);
        });

        // Update settings with new resume URL
        const settings = await prisma.siteSettings.upsert({
          where: { id: 'singleton' },
          update: { resumeUrl: result.secure_url, resumePublicId: result.public_id },
          create: { id: 'singleton', resumeUrl: result.secure_url, resumePublicId: result.public_id },
        });

        response.json({ settings, resumeUrl: result.secure_url });
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    next(error);
  }
});
