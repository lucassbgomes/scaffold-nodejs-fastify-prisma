import { PrismaUsersRepository } from '@/infra/repositories/users/prisma/prisma-users.repository';
import { CreateUserUseCase } from '../create-user.usecase';

export function makeCreateUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const createUserCase = new CreateUserUseCase(prismaUsersRepository);

  return createUserCase;
}
