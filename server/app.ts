import cookieParser from 'cookie-parser';
import compression from 'compression';
import express from 'express';
import path from 'node:path';
import { errorHandler } from './middleware/errorHandler.js';
import { authRouter } from './routes/auth.js';
import { adminProjectsRouter, projectsRouter } from './routes/projects.js';
import { uploadsRouter } from './routes/uploads.js';

export const createApp = () => {
  const app = express();

  app.use(compression());
  app.use(express.json({ limit: '1mb' }));
  app.use(cookieParser());

  app.get('/api/health', (_request, response) => {
    response.json({ ok: true });
  });

  app.use('/api/auth', authRouter);
  app.use('/api/projects', projectsRouter);
  app.use('/api/admin/projects', adminProjectsRouter);
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