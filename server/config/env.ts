import 'dotenv/config';

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 5000),
  jwtSecret: process.env.JWT_SECRET ?? '',
  adminUsername: process.env.ADMIN_USERNAME ?? 'admin',
  adminPasswordHash: process.env.ADMIN_PASSWORD_HASH ?? '',
  cookieSecure: process.env.COOKIE_SECURE === 'true' || process.env.NODE_ENV === 'production',
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME ?? '',
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY ?? '',
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET ?? '',
  cloudinaryProjectsFolder: process.env.CLOUDINARY_PROJECTS_FOLDER ?? 'portfolio/projects',
  cloudinaryResumeFolder: process.env.CLOUDINARY_RESUME_FOLDER ?? 'portfolio/resume',
  cloudinaryAttachmentsFolder: process.env.CLOUDINARY_ATTACHMENTS_FOLDER ?? 'portfolio/attachments',
};

export const requireServerSecret = (value: string, label: string) => {
  if (!value) {
    throw new Error(`${label} is not configured.`);
  }

  return value;
};
