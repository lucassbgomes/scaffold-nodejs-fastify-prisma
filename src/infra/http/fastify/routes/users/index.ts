import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/infra/http/fastify/middlewares/verify-jwt';
import { verifyUserRole } from '@/infra/http/fastify/middlewares/verify-user-role';

import { createUserController } from '@/infra/http/fastify/controllers/users/create-user.controller';
import { editUserController } from '@/infra/http/fastify/controllers/users/edit-user.controller';
import { deleteUserController } from '@/infra/http/fastify/controllers/users/delete-user.controller';
import { getUserProfileController } from '@/infra/http/fastify/controllers/users/get-user-profile.controller';
import { fetchUsersController } from '@/infra/http/fastify/controllers/users/fetch-users.controller';
import { getUserByIdController } from '@/infra/http/fastify/controllers/users/get-user-by-id.controller';

import { UserEntityRole } from '@/domain/website/enterprise/entities/user/user.types';

export default async function usersRoutes(app: FastifyInstance) {
  app.post('/users', createUserController);

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, getUserProfileController);

  app.get('/users', { onRequest: [verifyJWT] }, fetchUsersController);

  app.get('/users/:id', { onRequest: [verifyJWT] }, getUserByIdController);

  app.patch('/users/:id', { onRequest: [verifyJWT] }, editUserController);

  app.delete(
    '/users/:id',
    { onRequest: [verifyJWT, verifyUserRole('ADMIN')] },
    deleteUserController,
  );
}
