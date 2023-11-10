import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/infra/http/fastify/middlewares/verify-jwt';
import { verifyUserRole } from '@/infra/http/fastify/middlewares/verify-user-role';

import { registerUserController } from '@/infra/http/fastify/controllers/users/register-user.controller';
import { editUserController } from '@/infra/http/fastify/controllers/users/edit-user.controller';
import { deleteUserController } from '@/infra/http/fastify/controllers/users/delete-user.controller';
import { getUserProfileController } from '@/infra/http/fastify/controllers/users/get-user-profile.controller';
import { fetchUsersController } from '@/infra/http/fastify/controllers/users/fetch-users.controller';
import { getUserByIdController } from '@/infra/http/fastify/controllers/users/get-user-by-id.controller';
import {
  registerUserSchema,
  deleteUserSchema,
  editUserSchema,
  fetchUsersSchema,
  getUserByIdSchema,
  getUserProfileSchema,
} from './users-schema.swagger';

export default async function usersRoutes(app: FastifyInstance) {
  app.post('/users', { schema: registerUserSchema }, registerUserController);

  /** Authenticated */
  app.get(
    '/me',
    { onRequest: [verifyJWT], schema: getUserProfileSchema },
    getUserProfileController,
  );

  app.get(
    '/users',
    { onRequest: [verifyJWT], schema: fetchUsersSchema },
    fetchUsersController,
  );

  app.get(
    '/users/:id',
    { onRequest: [verifyJWT], schema: getUserByIdSchema },
    getUserByIdController,
  );

  app.patch(
    '/users/:id',
    { onRequest: [verifyJWT], schema: editUserSchema },
    editUserController,
  );

  app.delete(
    '/users/:id',
    {
      onRequest: [verifyJWT, verifyUserRole('ADMIN')],
      schema: deleteUserSchema,
    },
    deleteUserController,
  );
}
