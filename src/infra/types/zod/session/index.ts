import { z } from 'zod';

import { CreateSessionUserUseCaseRequest } from '@/domain/website/application/use-cases/session/create-session-user.usecase';

const createSessionUserSchema = z.object({
  user_name: z.string().min(1),
  password: z.string(),
});

export const parseCreateSessionUserBodySchema = (
  body: unknown,
): CreateSessionUserUseCaseRequest => {
  return createSessionUserSchema.parse(body);
};
