import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';
import { createS3Client, deleteObjectFromS3, getPublicS3Url, uploadBufferToS3 } from '../utils/s3.js';

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
    const { env } = await import('../config/env.js');

    const s3Client = createS3Client();

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
        const bucketName = env.s3BucketName;
        const folder = env.s3ResumeFolder;

        const current = await prisma.siteSettings.findUnique({ where: { id: 'singleton' } });
        if (current?.resumePublicId) {
          await deleteObjectFromS3({ client: s3Client, bucketName, key: current.resumePublicId }).catch(() => {});
        }

        const key = `${folder}/Lantano_Romano_resume.pdf`;
        await uploadBufferToS3({
          client: s3Client,
          bucketName,
          key,
          body: request.file.buffer,
          contentType: 'application/pdf',
        });

        const resumeUrl = getPublicS3Url({ bucketName, key });

        // Update settings with new resume URL
        const settings = await prisma.siteSettings.upsert({
          where: { id: 'singleton' },
          update: { resumeUrl, resumePublicId: key },
          create: { id: 'singleton', resumeUrl, resumePublicId: key },
        });

        response.json({ settings, resumeUrl });
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    next(error);
  }
});
