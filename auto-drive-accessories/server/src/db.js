import { PrismaClient } from '@prisma/client';

// A single shared Prisma instance for the whole server
export const prisma = new PrismaClient();
