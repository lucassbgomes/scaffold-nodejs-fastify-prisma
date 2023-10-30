import { PrismaUsersRepository } from '@/repositories/users/prisma/prisma-users.repository';
import { GetByIdUserUseCase } from '../get-by-id-user.usecase';

export function makeGetByIdUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const getByIdUserUseCase = new GetByIdUserUseCase(prismaUsersRepository);

  return getByIdUserUseCase;
}
