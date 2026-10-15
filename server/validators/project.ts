import { z } from 'zod';

const optionalUrl = z.string().url().optional().or(z.literal(''));

export const projectInputSchema = z.object({
  slug: z.string().trim().min(2).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers, and hyphens only.'),
  title: z.string().trim().min(2).max(160),
  eyebrow: z.string().trim().min(2).max(80),
  summary: z.string().trim().min(10).max(260),
  description: z.string().trim().min(10).max(600),
  imageUrl: z.string().trim().min(1).max(1200),
  imagePublicId: z.string().trim().max(300).optional().or(z.literal('')),
  stack: z.array(z.string().trim().min(1).max(40)).min(1).max(16),
  role: z.string().trim().min(2).max(120),
  timeframe: z.string().trim().min(2).max(80),
  githubUrl: z.string().url(),
  demoUrl: optionalUrl,
  demoAdminUrl: optionalUrl,
  problem: z.string().trim().min(10).max(900),
  solution: z.string().trim().min(10).max(900),
  highlights: z.array(z.string().trim().min(2).max(160)).min(1).max(12),
  outcome: z.string().trim().min(10).max(900),
  accent: z.string().trim().regex(/^#[0-9a-fA-F]{6}$/, 'Use a hex color like #d9b46d.'),
  sortOrder: z.coerce.number().int().min(0).max(9999).default(0),
  featured: z.coerce.boolean().default(true),
});

export type ProjectInput = z.infer<typeof projectInputSchema>;