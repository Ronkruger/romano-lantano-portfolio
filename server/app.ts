import cookieParser from 'cookie-parser';
import compression from 'compression';
import express from 'express';
import path from 'node:path';
import { env } from './config/env.js';
import { prisma } from './db.js';
import { requireAdmin } from './middleware/auth.js';
import { errorHandler } from './middleware/errorHandler.js';
import { authRouter } from './routes/auth.js';
import { adminProjectsRouter, projectsRouter } from './routes/projects.js';
import { adminSettingsRouter, settingsRouter } from './routes/settings.js';
import { uploadsRouter } from './routes/uploads.js';

export const createApp = () => {
  const app = express();

  app.use(compression());
  app.use(express.json({ limit: '1mb' }));
  app.use(cookieParser());

  app.get('/api/health', async (_request, response) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      response.json({ ok: true, database: 'connected' });
    } catch {
      response.status(503).json({ ok: false, database: 'unreachable' });
    }
  });

  app.get('/api/admin/status', requireAdmin, async (_request, response) => {
    // Database check
    let database: { status: string; latency?: number } = { status: 'unreachable' };
    try {
      const start = Date.now();
      await prisma.$queryRaw`SELECT 1`;
      database = { status: 'connected', latency: Date.now() - start };
    } catch {
      database = { status: 'unreachable' };
    }

    // Cloudinary check
    const cloudinary = {
      configured: Boolean(env.cloudinaryCloudName && env.cloudinaryCloudName !== 'your-cloud-name' && env.cloudinaryApiKey && env.cloudinaryApiKey !== 'your-api-key' && env.cloudinaryApiSecret && env.cloudinaryApiSecret !== 'your-api-secret'),
      cloudName: env.cloudinaryCloudName || null,
      folder: env.cloudinaryFolder || null,
    };

    // Auth config check
    const auth = {
      jwtConfigured: Boolean(env.jwtSecret && env.jwtSecret.length >= 32),
      adminUsername: env.adminUsername,
      passwordHashSet: Boolean(env.adminPasswordHash && env.adminPasswordHash.startsWith('$2')),
      cookieSecure: env.cookieSecure,
    };

    // Environment info
    const environment = {
      nodeEnv: env.nodeEnv,
      port: env.port,
      uptime: Math.round(process.uptime()),
      nodeVersion: process.version,
      memoryUsage: Math.round(process.memoryUsage().rss / 1024 / 1024),
    };

    response.json({ database, cloudinary, auth, environment });
  });

  app.use('/api/auth', authRouter);
  app.use('/api/projects', projectsRouter);
  app.use('/api/settings', settingsRouter);
  app.use('/api/admin/projects', adminProjectsRouter);
  app.use('/api/admin/settings', adminSettingsRouter);
  app.use('/api/admin/uploads', uploadsRouter);
  app.use('/api', (_request, response) => {
    response.status(404).json({ message: 'API route not found.' });
  });

  const rootDir = process.cwd();
  const distDir = path.join(rootDir, 'dist');
  const imagesDir = path.join(rootDir, 'images');

  app.use('/images', express.static(imagesDir, { maxAge: '30d' }));
  app.use(express.static(distDir, { maxAge: '1h' }));

  app.get(/.*/, (_request, response) => {
    response.sendFile(path.join(distDir, 'index.html'));
  });

  app.use(errorHandler);

  return app;
};