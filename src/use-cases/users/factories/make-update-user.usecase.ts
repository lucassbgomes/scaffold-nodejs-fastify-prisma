import { PrismaUsersRepository } from '@/repositories/users/prisma/prisma-users.repository';
import { UpdateUserUseCase } from '../update-user.usecase';

export function makeUpdateUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const updateUserCase = new UpdateUserUseCase(prismaUsersRepository);

  return updateUserCase;
}
