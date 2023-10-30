import { FastifyReply, FastifyRequest } from 'fastify';

import { makeDeleteUserUseCase } from '@/use-cases/users/factories/make-delete-user.usecase';

export async function deleteUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteUserUseCase = makeDeleteUserUseCase();

  await deleteUserUseCase.execute({
    id: request.user.sub,
  });

  return reply.status(204).send();
}
