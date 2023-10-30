import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryUsersRepository } from '@/repositories/users/in-memory/in-memory.repository';
import { hash } from 'bcryptjs';
import { GetByIdUserUseCase } from '@/use-cases/users/get-by-id-user.usecase';

let usersRepository: InMemoryUsersRepository;
let sut: GetByIdUserUseCase;

describe('Get By ID User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetByIdUserUseCase(usersRepository);
  });

  it('should be able to get a user by id', async () => {
    const createdUser = await usersRepository.create({
      first_name: 'Lucas',
      last_name: 'Gomes',
      user_name: 'lucassbgomes',
      email: 'lucas.sbgomes@gmail.com',
      password: await hash('123456789', 5),
    });

    const userFound = await sut.execute({ id: createdUser.id });

    expect(userFound).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({
          id: expect.any(String),
        }),
      }),
    );
  });

  it('should not be able to get user by id inexistent', async () => {
    const user = await sut.execute({ id: 'inexistent-id' });

    expect(user).toBeNull();
  });
});
