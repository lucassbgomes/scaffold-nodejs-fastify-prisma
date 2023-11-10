import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/users/prisma/prisma-users.repository';
import { CreateSessionUserUseCase } from '../create-session-user.usecase';

export function makeCreateSessionUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const createSessionUserCase = new CreateSessionUserUseCase(
    prismaUsersRepository,
  );

  return createSessionUserCase;
}
