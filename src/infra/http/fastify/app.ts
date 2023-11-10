import fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';

import { errorHandler } from './errors';
import { swagger, swaggerOptions } from './plugin/swagger';
import { swaggerUi, swaggerUiOptions } from './plugin/swagger-ui';
import fastifyJwt from '@fastify/jwt';
import { env } from '@/infra/env';

import { messageResponseErrorSchema, noContentSchema } from './schema';

import { sessionRoutes, usersRoutes } from './routes';
import {
  userResponseSchema,
  userRoleSchema,
  usersResponseSchema,
} from './routes/users/users-schema.swagger';

export const app = fastify();

app.addSchema(messageResponseErrorSchema);
app.addSchema(noContentSchema);
app.addSchema(userRoleSchema);
app.addSchema(userResponseSchema);
app.addSchema(usersResponseSchema);

app.register(swagger, swaggerOptions);
app.register(swaggerUi, swaggerUiOptions);

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

app.register(sessionRoutes);
app.register(usersRoutes);

app.setErrorHandler(errorHandler);

app.ready((err) => {
  if (err) throw err;

  app.swagger();
});
