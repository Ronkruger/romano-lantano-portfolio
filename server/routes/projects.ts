import { Prisma } from '@prisma/client';
import { Router } from 'express';
import { prisma } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';
import { toPublicProject } from '../services/projectMapper.js';
import { projectInputSchema } from '../validators/project.js';

const projectOrder = [{ sortOrder: 'asc' }, { createdAt: 'asc' }] satisfies Prisma.ProjectOrderByWithRelationInput[];

export const projectsRouter = Router();
export const adminProjectsRouter = Router();

projectsRouter.get('/', async (_request, response, next) => {
  try {
    const projects = await prisma.project.findMany({
      where: { featured: true },
      orderBy: projectOrder,
    });

    response.json({ projects: projects.map(toPublicProject) });
  } catch (error) {
    next(error);
  }
});

projectsRouter.get('/:slug', async (request, response, next) => {
  try {
    const project = await prisma.project.findUnique({ where: { slug: request.params.slug } });

    if (!project || !project.featured) {
      response.status(404).json({ message: 'Project not found.' });
      return;
    }

    const projectList = await prisma.project.findMany({
      where: { featured: true },
      orderBy: projectOrder,
    });
    const currentIndex = projectList.findIndex((item) => item.slug === project.slug);

    response.json({
      project: toPublicProject(project),
      previousProject: currentIndex >= 0 ? toPublicProject(projectList[(currentIndex - 1 + projectList.length) % projectList.length]) : null,
      nextProject: currentIndex >= 0 ? toPublicProject(projectList[(currentIndex + 1) % projectList.length]) : null,
    });
  } catch (error) {
    next(error);
  }
});

adminProjectsRouter.use(requireAdmin);

adminProjectsRouter.get('/', async (_request, response, next) => {
  try {
    const projects = await prisma.project.findMany({ orderBy: projectOrder });
    response.json({ projects: projects.map(toPublicProject) });
  } catch (error) {
    next(error);
  }
});

adminProjectsRouter.post('/', async (request, response, next) => {
  try {
    const input = projectInputSchema.parse(request.body);
    const project = await prisma.project.create({ data: input });
    response.status(201).json({ project: toPublicProject(project) });
  } catch (error) {
    next(error);
  }
});

adminProjectsRouter.put('/:id', async (request, response, next) => {
  try {
    const input = projectInputSchema.parse(request.body);
    const project = await prisma.project.update({ where: { id: request.params.id }, data: input });
    response.json({ project: toPublicProject(project) });
  } catch (error) {
    next(error);
  }
});

adminProjectsRouter.delete('/:id', async (request, response, next) => {
  try {
    await prisma.project.delete({ where: { id: request.params.id } });
    response.status(204).send();
  } catch (error) {
    next(error);
  }
});