import { FastifyReply, FastifyRequest } from 'fastify';

import { parseUserBodyPostSchema } from '@/types/users';
import { UserAlreadyExistsError } from '@/errors/users/user-already-exists.error';
import { makeRegisterUserUseCase } from '@/use-cases/users/factories/make-register-user.usecase';

export async function registerUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const registerUserCase = makeRegisterUserUseCase();

    await registerUserCase.execute(parseUserBodyPostSchema(request.body));
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}
