import fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';

import { usersRoutes } from '@/http/routes/users';
import { errorHandler } from './errors';
import fastifyJwt from '@fastify/jwt';
import { env } from './env';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m', // 10 minutes
  },
});

app.register(fastifyCookie);

app.register(usersRoutes);

app.setErrorHandler(errorHandler);
