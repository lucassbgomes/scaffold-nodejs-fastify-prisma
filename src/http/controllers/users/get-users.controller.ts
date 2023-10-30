import { makeGetUsersUseCase } from '@/use-cases/users/factories/make-get-users.usecase';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function getUsersController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUsersUseCase = makeGetUsersUseCase();

  const { users } = await getUsersUseCase.execute();

  return reply.status(200).send({
    users,
  });
}
