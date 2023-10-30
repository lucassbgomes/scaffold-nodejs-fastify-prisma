import { FastifyInstance } from 'fastify';
import request from 'supertest';

import { UserRole } from '@prisma/client';

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await request(app.server)
    .post('/users')
    .send({
      first_name: 'Lucas',
      last_name: 'Gomes',
      user_name: 'lucasgomes',
      email: 'lucas.sbgomes@gmail.com',
      password: '123456789',
      role: isAdmin ? UserRole.ADMIN : UserRole.USER,
    });

  const authResponse = await request(app.server).post('/session').send({
    user_name: 'lucasgomes',
    password: '123456789',
  });

  const { token } = authResponse.body;

  return {
    token,
  };
}
