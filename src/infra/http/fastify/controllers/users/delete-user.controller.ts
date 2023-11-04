import { FastifyReply, FastifyRequest } from 'fastify';

import { NotAllowedError, ResourceNotFoundError } from '@/core/errors';

import { parseUserParamsRequestSchema } from '@/infra/types/zod/users';

import { makeDeleteUserUseCase } from '@/domain/website/application/use-cases/users/factories/make-delete-user.usecase';

export async function deleteUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const deleteUserUseCase = makeDeleteUserUseCase();

    const { id } = parseUserParamsRequestSchema(request.params);

    const result = await deleteUserUseCase.execute({ userId: id });

    if (result.isRight()) {
      return reply.status(204).send();
    }

    const { message } = result.value;
    let statusCode = result.value instanceof ResourceNotFoundError ? 400 : 403;

    return reply.status(statusCode).send({ message });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: error.message });
    }

    if (error instanceof NotAllowedError) {
      return reply.status(403).send({ message: error.message });
    }

    throw error;
  }
}
