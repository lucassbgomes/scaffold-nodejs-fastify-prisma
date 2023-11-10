import { FastifyReply, FastifyRequest } from 'fastify';

import { UserAlreadyExistsError } from '@/core/errors';

import { parseRegisterUserBodySchema } from '@/infra/types/zod/users';

import { makeRegisterUserUseCase } from '@/domain/website/application/use-cases/users/factories/make-register-user.usecase';

export async function registerUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const registerUserCase = makeRegisterUserUseCase();

    const result = await registerUserCase.execute(
      parseRegisterUserBodySchema(request.body),
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
