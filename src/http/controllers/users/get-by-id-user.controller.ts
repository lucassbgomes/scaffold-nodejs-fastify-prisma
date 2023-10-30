import { FastifyReply, FastifyRequest } from 'fastify';

import { makeGetByIdUserUseCase } from '@/use-cases/users/factories/make-get-by-id-user.usecase';
import { parseUserParamsSchema } from '@/types/users';

export async function getByIdUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getByIdUserUseCase = makeGetByIdUserUseCase();

  const { id } = parseUserParamsSchema(request.params);

  const user = await getByIdUserUseCase.execute({
    id,
  });

  return reply.status(200).send(user);
}
