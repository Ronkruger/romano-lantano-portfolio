import { Prisma } from '@prisma/client';
import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Express error handler middleware
export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {

  if (error instanceof ZodError) {
    response.status(400).json({ message: 'Validation failed.', issues: error.flatten().fieldErrors });
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      response.status(409).json({ message: 'A project with this unique value already exists.' });
      return;
    }

    if (error.code === 'P2025') {
      response.status(404).json({ message: 'Record not found.' });
      return;
    }
  }

  if (error instanceof Error && error.message.includes('not configured')) {
    response.status(500).json({ message: error.message });
    return;
  }

  console.error(error);
  response.status(500).json({ message: 'Unexpected server error.' });
};