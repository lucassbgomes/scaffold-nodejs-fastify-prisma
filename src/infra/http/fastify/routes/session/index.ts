import { FastifyInstance } from 'fastify';

import { createSessionUserController } from '@/infra/http/fastify/controllers/session/create-session-user.controller';
import { refreshTokenSessionUserController } from '@/infra/http/fastify/controllers/session/refresh-token-session-user.controller';

export default async function sessionRoutes(app: FastifyInstance) {
  app.post('/session', createSessionUserController);

  app.patch('/token/refresh', refreshTokenSessionUserController);
}
