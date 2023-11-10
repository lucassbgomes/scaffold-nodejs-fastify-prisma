import { FastifyReply, FastifyRequest } from 'fastify';

import {
  parseEditUserBodySchema,
  parseUserParamsRequestSchema,
} from '@/infra/types/zod/users';

import { NotAllowedError, ResourceNotFoundError } from '@/core/errors';

import { makeEditUserUseCase } from '@/domain/website/application/use-cases/users/factories/make-edit-user.usecase';

export async function editUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const updateUserUseCase = makeEditUserUseCase();

    const { sub, role } = request.user;

    const { id } = parseUserParamsRequestSchema(request.params);

    const editUser = {
      loggedUserId: sub,
      loggedUserRole: role,
      data: {
        id,
        ...parseEditUserBodySchema(request.body),
      },
    };

    const result = await updateUserUseCase.execute(editUser);

    if (result.isRight()) {
      return reply.status(204).send();
    }

    const { message } = result.value;
    const statusCode =
      result.value instanceof ResourceNotFoundError ? 400 : 403;

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
