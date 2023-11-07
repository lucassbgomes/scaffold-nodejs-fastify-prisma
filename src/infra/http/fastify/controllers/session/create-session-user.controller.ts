import { FastifyReply, FastifyRequest } from 'fastify';

import { InvalidCredentialsError } from '@/core/errors';
import { parseCreateSessionUserBodySchema } from '@/infra/types/zod/session';
import { makeCreateSessionUserUseCase } from '@/domain/website/application/use-cases/session/factories/make-create-session-user.usecase';

export async function createSessionUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const createSessionUserCase = makeCreateSessionUserUseCase();

    const result = await createSessionUserCase.execute(
      parseCreateSessionUserBodySchema(request.body),
    );

    if (result.isRight()) {
      const { user } = result.value;

      const id = user.id.toString();
      const { first_name, last_name, role } = user;
      const name = `${first_name} ${last_name}`;

      const token = await reply.jwtSign(
        {
          name,
          role,
        },
        {
          sign: {
            sub: id.toString(),
            expiresIn: '15m',
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
            sub: id.toString(),
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
    }

    const { message } = result.value;
    return reply.status(400).send({ message });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
