import { beforeEach, describe, expect, it } from 'vitest';

import { UpdateUserUseCase } from '@/use-cases/users/update-user.usecase';
import { InMemoryUsersRepository } from '@/repositories/users/in-memory/in-memory.repository';
import { compare } from 'bcryptjs';

let usersRepository: InMemoryUsersRepository;
let sut: UpdateUserUseCase;

describe('Update User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UpdateUserUseCase(usersRepository);
  });

  it('should be able to update a user', async () => {
    const { id } = await usersRepository.create({
      first_name: 'Lucas',
      last_name: 'Gomes',
      user_name: 'lucassbgomes',
      email: 'lucas.sbgomes@gmail.com',
      password: '123456789',
    });

    const { user } = await sut.execute(id, {
      last_name: 'Edit',
    });

    expect(user.last_name).toEqual('Edit');
  });

  it('should be able to update password hash', async () => {
    const { id } = await usersRepository.create({
      first_name: 'Lucas',
      last_name: 'Gomes',
      user_name: 'lucassbgomes',
      email: 'lucas.sbgomes@gmail.com',
      password: '123456789',
    });

    const { user } = await sut.execute(id, {
      password: 'edit_password',
    });

    const isPasswordCorrectlyHashed = await compare(
      'edit_password',
      user.password,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
