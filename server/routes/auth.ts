import bcrypt from 'bcryptjs';
import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { env, requireServerSecret } from '../config/env.js';
import { authCookieName, requireAdmin } from '../middleware/auth.js';

const loginSchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(1),
});

const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: 'Too many login attempts. Please try again in 15 minutes.' },
});

export const authRouter = Router();

authRouter.post('/login', loginRateLimit, async (request, response, next) => {
  try {
    const credentials = loginSchema.parse(request.body);
    const expectedHash = requireServerSecret(env.adminPasswordHash, 'ADMIN_PASSWORD_HASH');
    const jwtSecret = requireServerSecret(env.jwtSecret, 'JWT_SECRET');

    const usernameMatches = credentials.username === env.adminUsername;
    const passwordMatches = await bcrypt.compare(credentials.password, expectedHash);

    if (!usernameMatches || !passwordMatches) {
      response.status(401).json({ message: 'Invalid admin credentials.' });
      return;
    }

    const token = jwt.sign({ sub: 'admin', username: credentials.username }, jwtSecret, { expiresIn: '8h' });

    response.cookie(authCookieName, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: env.cookieSecure,
      maxAge: 8 * 60 * 60 * 1000,
      path: '/',
    });

    response.json({ username: credentials.username });
  } catch (error) {
    next(error);
  }
});

authRouter.post('/logout', (_request, response) => {
  response.clearCookie(authCookieName, { path: '/' });
  response.status(204).send();
});

authRouter.get('/me', requireAdmin, (_request, response) => {
  response.json({ username: response.locals.admin?.username ?? env.adminUsername });
});