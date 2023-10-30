import { PrismaUsersRepository } from '@/repositories/users/prisma/prisma-users.repository';
import { RegisterUserUseCase } from '../register-user.usecase';

export function makeRegisterUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const registerUserCase = new RegisterUserUseCase(prismaUsersRepository);

  return registerUserCase;
}
