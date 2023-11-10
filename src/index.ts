import { env } from '@/infra/env';
import { app } from '@/infra/http/fastify/app';
import { log } from 'console';

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    log('🟢 HTTP app Running!');
  });
