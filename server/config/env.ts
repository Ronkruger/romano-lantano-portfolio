import 'dotenv/config';

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 5000),
  jwtSecret: process.env.JWT_SECRET ?? '',
  adminUsername: process.env.ADMIN_USERNAME ?? 'admin',
  adminPasswordHash: process.env.ADMIN_PASSWORD_HASH ?? '',
  cookieSecure: process.env.COOKIE_SECURE === 'true' || process.env.NODE_ENV === 'production',
  awsRegion: process.env.AWS_REGION ?? 'us-east-1',
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
  s3BucketName: process.env.S3_BUCKET_NAME ?? '',
  s3ProjectsFolder: process.env.S3_PROJECTS_FOLDER ?? 'projects',
  s3ResumeFolder: process.env.S3_RESUME_FOLDER ?? 'resume',
};

export const requireServerSecret = (value: string, label: string) => {
  if (!value) {
    throw new Error(`${label} is not configured.`);
  }

  return value;
};