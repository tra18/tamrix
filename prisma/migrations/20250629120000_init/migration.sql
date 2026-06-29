-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "quote_requests" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'NEW',
    "adminNotes" TEXT,
    "locale" VARCHAR(5) NOT NULL,
    "company" VARCHAR(200) NOT NULL,
    "contactName" VARCHAR(200) NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "phone" VARCHAR(30),
    "projectSlugs" TEXT[],
    "customProject" BOOLEAN NOT NULL DEFAULT false,
    "sector" VARCHAR(50) NOT NULL,
    "companySize" VARCHAR(20) NOT NULL,
    "description" TEXT NOT NULL,
    "modules" TEXT[],
    "userCount" VARCHAR(20) NOT NULL,
    "integrations" TEXT[],
    "needsMobile" BOOLEAN NOT NULL DEFAULT false,
    "needsMultiSite" BOOLEAN NOT NULL DEFAULT false,
    "existingSystems" TEXT,
    "timeline" VARCHAR(20) NOT NULL,
    "complexity" VARCHAR(20) NOT NULL,
    "specification" JSONB NOT NULL,

    CONSTRAINT "quote_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_requests" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'NEW',
    "adminNotes" TEXT,
    "locale" VARCHAR(5) NOT NULL,
    "appSlug" VARCHAR(80) NOT NULL,
    "appName" VARCHAR(200) NOT NULL,
    "company" VARCHAR(200) NOT NULL,
    "contactName" VARCHAR(200) NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "phone" VARCHAR(30),
    "plan" VARCHAR(20) NOT NULL,
    "notes" TEXT,

    CONSTRAINT "order_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "quote_requests_createdAt_idx" ON "quote_requests"("createdAt");

-- CreateIndex
CREATE INDEX "quote_requests_status_idx" ON "quote_requests"("status");

-- CreateIndex
CREATE INDEX "quote_requests_email_idx" ON "quote_requests"("email");

-- CreateIndex
CREATE INDEX "order_requests_createdAt_idx" ON "order_requests"("createdAt");

-- CreateIndex
CREATE INDEX "order_requests_status_idx" ON "order_requests"("status");

-- CreateIndex
CREATE INDEX "order_requests_email_idx" ON "order_requests"("email");

-- CreateIndex
CREATE INDEX "order_requests_appSlug_idx" ON "order_requests"("appSlug");
