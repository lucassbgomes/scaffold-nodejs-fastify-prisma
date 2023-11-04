import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  JWT_SECRET: z.string(),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']).default('pg'),
  DATABASE_URL: z.string().min(1),
  PORT: z.coerce.number().default(3333),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('Invalid environment variables!', _env.error.format());

  throw new Error('🔴Invalid environment variables!');
}

export const env = _env.data;
