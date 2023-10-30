import { FastifyReply, FastifyRequest } from 'fastify';

import { parseUserBodyAuthenticateSchema } from '@/types/users';
import { InvalidCredentialsError } from '@/errors/users/invalid-credentials.error';
import { makeAuthenticateUserUseCase } from '@/use-cases/users/factories/make-authenticate-user.usecase';

export async function authenticateUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const authenticateUserCase = makeAuthenticateUserUseCase();

    const { user } = await authenticateUserCase.execute(
      parseUserBodyAuthenticateSchema(request.body),
    );

    const { id, first_name, last_name, role } = user;

    const name = `${first_name} ${last_name}`;

    const token = await reply.jwtSign(
      {
        name,
        role,
      },
      {
        sign: {
          sub: id,
        },
      },
    );

    const refreshToken = await reply.jwtSign(
      {
        name,
        role,
      },
      {
        sign: {
          sub: id,
          expiresIn: '7d', // 7 days
        },
      },
    );

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
