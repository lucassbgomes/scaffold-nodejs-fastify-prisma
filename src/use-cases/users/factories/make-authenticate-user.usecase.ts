import { PrismaUsersRepository } from '@/repositories/users/prisma/prisma-users.repository';
import { AuthenticateUserUseCase } from '../authenticate-user.usecase';

export function makeAuthenticateUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const authenticateUserCase = new AuthenticateUserUseCase(
    prismaUsersRepository,
  );

  return authenticateUserCase;
}
