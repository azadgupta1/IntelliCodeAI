import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma', // path to your schema
  migrations: {
    path: './prisma/migrations', // optional
  },
  datasource: {
    url: env('DATABASE_URL'), // CLI tools will pick this up
  },
});
