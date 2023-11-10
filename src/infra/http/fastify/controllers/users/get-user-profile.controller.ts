import { ResourceNotFoundError } from '@/core/errors';
import { makeGetUserProfileUseCase } from '@/domain/website/application/use-cases/users/factories/make-get-user-profile-user.usecase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { UserPresenter } from '@/infra/http/fastify/presenters/users/user.presenter';

export async function getUserProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getProfileUserUseCase = makeGetUserProfileUseCase();

    const result = await getProfileUserUseCase.execute({
      userId: request.user.sub,
    });

    if (result.isRight()) {
      const { user } = result.value;
      return reply.status(200).send({ user: UserPresenter.toJson(user) });
    }

    const { message } = result.value;
    return reply.status(400).send({ message });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
