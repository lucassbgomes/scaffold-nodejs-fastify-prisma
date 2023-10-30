import { PrismaUsersRepository } from '@/repositories/users/prisma/prisma-users.repository';
import { DeleteUserUseCase } from '../delete-user.usecase';

export function makeDeleteUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const deleteUserUseCase = new DeleteUserUseCase(prismaUsersRepository);

  return deleteUserUseCase;
}
