import { FastifyReply, FastifyRequest } from 'fastify';

import { parseUserQueryParamsRequestSchema } from '@/infra/types/zod/users';

import { makeFetchUsersUseCase } from '@/domain/website/application/use-cases/users/factories/make-fetch-users.usecase';
import { UserPresenter } from '../../presenters/users/user.presenter';

export async function fetchUsersController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchUsersUseCase = makeFetchUsersUseCase();

  const { page, size } = parseUserQueryParamsRequestSchema(request.query);

  const { value } = await fetchUsersUseCase.execute({
    page: page ?? 1,
    size,
  });

  const users = value?.users.map(UserPresenter.toJson) ?? [];

  return reply.status(200).send({
    users,
  });
}
