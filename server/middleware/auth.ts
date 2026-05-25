import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env, requireServerSecret } from '../config/env.js';

interface AdminTokenPayload {
  sub: string;
  username: string;
}

export const authCookieName = 'portfolio_admin_token';

export const requireAdmin = (request: Request, response: Response, next: NextFunction) => {
  const token = request.cookies?.[authCookieName];

  if (!token) {
    response.status(401).json({ message: 'Authentication required.' });
    return;
  }

  try {
    const payload = jwt.verify(token, requireServerSecret(env.jwtSecret, 'JWT_SECRET')) as AdminTokenPayload;
    response.locals.admin = payload;
    next();
  } catch {
    response.status(401).json({ message: 'Invalid or expired session.' });
  }
};