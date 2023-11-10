import { FastifyReply, FastifyRequest } from 'fastify';

import { ResourceNotFoundError } from '@/core/errors';

import { parseUserParamsRequestSchema } from '@/infra/types/zod/users';
import { UserPresenter } from '@/infra/http/fastify/presenters/users/user.presenter';

import { makeGetUserByIdUseCase } from '@/domain/website/application/use-cases/users/factories/make-get-user-by-id.usecase';

export async function getUserByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getByIdUserUseCase = makeGetUserByIdUseCase();

    const { id } = parseUserParamsRequestSchema(request.params);

    const result = await getByIdUserUseCase.execute({
      userId: id,
    });

    if (result.isRight()) {
      const { user } = result.value;
      return reply.status(200).send({ user: UserPresenter.toJson(user) });
    }
    const { message } = result.value;
    return reply.status(400).send({ error: 'ResourceNotFoundError', message });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply
        .status(400)
        .send({ error: 'ResourceNotFoundError', message: error.message });
    }

    throw error;
  }
}
