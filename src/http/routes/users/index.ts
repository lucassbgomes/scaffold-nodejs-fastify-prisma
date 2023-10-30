import { FastifyInstance } from 'fastify';

import { prisma } from '@/lib/prisma';
import { registerUserController } from '@/http/controllers/users/register-user.controller';
import { authenticateUserController } from '@/http/controllers/users/authenticate-user.controller';
import { UserRoleEnum, parseUserParamsSchema } from '@/types/users';
import { getProfileUserController } from '@/http/controllers/users/get-profile-user.controller';
import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { updateUserController } from '@/http/controllers/users/update-user.controller';
import { getUsersController } from '@/http/controllers/users/get-users.controller';
import { getByIdUserController } from '@/http/controllers/users/get-by-id-user.controller';
import { deleteUserController } from '@/http/controllers/users/delete-user.controller';
import { refreshTokenUserController } from '@/http/controllers/users/refresh-token-user.controller';
import { verifyUserRole } from '@/http/middlewares/verify-user-role';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerUserController);

  app.post('/session', authenticateUserController);

  app.patch('/token/refresh', refreshTokenUserController);

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, getProfileUserController);

  app.get('/users', { onRequest: [verifyJWT] }, getUsersController);

  app.get('/users/:id', { onRequest: [verifyJWT] }, getByIdUserController);

  app.patch('/users/:id', { onRequest: [verifyJWT] }, updateUserController);

  app.delete(
    '/users/:id',
    { onRequest: [verifyJWT, verifyUserRole('ADMIN')] },
    deleteUserController,
  );
}
