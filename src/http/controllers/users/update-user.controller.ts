import { FastifyReply, FastifyRequest } from 'fastify';

import { makeUpdateUserUseCase } from '@/use-cases/users/factories/make-update-user.usecase';
import { parseUserBodyPatchSchema, parseUserParamsSchema } from '@/types/users';

export async function updateUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const updateUserUseCase = makeUpdateUserUseCase();

    const { id } = parseUserParamsSchema(request.params);
    const data = parseUserBodyPatchSchema(request.body);

    await updateUserUseCase.execute(id, data);

    return reply.status(204).send();
  } catch (error) {
    throw error;
  }
}
