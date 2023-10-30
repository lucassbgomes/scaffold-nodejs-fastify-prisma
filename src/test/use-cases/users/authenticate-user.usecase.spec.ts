import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryUsersRepository } from '@/repositories/users/in-memory/in-memory.repository';
import { AuthenticateUserUseCase } from '@/use-cases/users/authenticate-user.usecase';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from '@/errors/users/invalid-credentials.error';

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUserUseCase;

describe('Authenticate User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUserUseCase(usersRepository);
  });

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      first_name: 'Lucas',
      last_name: 'Gomes',
      user_name: 'lucassbgomes',
      email: 'lucas.sbgomes@gmail.com',
      password: await hash('123456789', 5),
    });

    const { user } = await sut.execute({
      user_name: 'lucassbgomes',
      password: '123456789',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email or username', async () => {
    await expect(() =>
      sut.execute({
        user_name: 'lucassbgomes',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      first_name: 'Lucas',
      last_name: 'Gomes',
      user_name: 'lucassbgomes',
      email: 'lucas.sbgomes@gmail.com',
      password: await hash('123456789', 5),
    });

    await expect(() =>
      sut.execute({
        user_name: 'lucassbgomes',
        password: '123456780',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
