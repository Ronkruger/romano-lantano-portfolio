-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "name" TEXT NOT NULL DEFAULT 'Romano Lantano',
    "title" TEXT NOT NULL DEFAULT 'Full-stack web developer',
    "location" TEXT NOT NULL DEFAULT 'Philippines',
    "email" TEXT NOT NULL DEFAULT 'romanolantano.dev@gmail.com',
    "intro" TEXT NOT NULL DEFAULT '',
    "resumeUrl" TEXT,
    "resumePublicId" TEXT,
    "githubUrl" TEXT NOT NULL DEFAULT 'https://github.com/Ronkruger',
    "linkedinUrl" TEXT NOT NULL DEFAULT 'https://www.linkedin.com/in/romano-lantano-418870234/',
    "facebookUrl" TEXT NOT NULL DEFAULT 'https://www.facebook.com/R2sl1/',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);
