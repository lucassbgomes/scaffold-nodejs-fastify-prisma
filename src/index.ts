import { env } from '@/infra/env';
import { app } from '@/infra/http/fastify/app';

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('🟢 HTTP app Running!');
  });
