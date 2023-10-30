import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryUsersRepository } from '@/repositories/users/in-memory/in-memory.repository';
import { hash } from 'bcryptjs';
import { GetUsersUseCase } from '@/use-cases/users/get-users.usecase';

let usersRepository: InMemoryUsersRepository;
let sut: GetUsersUseCase;

describe('Get Users Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUsersUseCase(usersRepository);
  });

  it('should be able to get many users', async () => {
    await usersRepository.create({
      first_name: 'Lucas',
      last_name: 'Gomes',
      user_name: 'lucassbgomes',
      email: 'lucas.sbgomes@gmail.com',
      password: await hash('123456789', 5),
    });

    const { users } = await sut.execute();

    expect(users.length).toEqual(1);
  });

  it('should be able to get no users', async () => {
    const { users } = await sut.execute();

    expect(users.length).toEqual(0);
  });
});
