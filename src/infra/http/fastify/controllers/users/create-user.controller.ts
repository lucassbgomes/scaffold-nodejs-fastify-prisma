import { FastifyReply, FastifyRequest } from 'fastify';

import { UserAlreadyExistsError } from '@/core/errors';

import { parseCreateUserBodySchema } from '@/infra/types/zod/users';

import { makeCreateUserUseCase } from '@/domain/website/application/use-cases/users/factories/make-create-user.usecase';

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const createUserCase = makeCreateUserUseCase();

    const result = await createUserCase.execute(
      parseCreateUserBodySchema(request.body),
    );

    if (result.isRight()) {
      return reply.status(201).send();
    }

    return reply.status(409).send({ message: result.value.message });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
