import { makeGetProfileUserUseCase } from '@/use-cases/users/factories/make-get-user-profile-user.usecase';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function getProfileUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfileUseCase = makeGetProfileUserUseCase();

  const user = await getUserProfileUseCase.execute({
    id: request.user.sub,
  });

  return reply.status(200).send(user);
}
