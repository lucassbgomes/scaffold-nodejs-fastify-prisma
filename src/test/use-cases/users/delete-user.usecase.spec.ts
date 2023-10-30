import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryUsersRepository } from '@/repositories/users/in-memory/in-memory.repository';
import { hash } from 'bcryptjs';
import { DeleteUserUseCase } from '@/use-cases/users/delete-user.usecase';

let usersRepository: InMemoryUsersRepository;
let sut: DeleteUserUseCase;

describe('Delete User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new DeleteUserUseCase(usersRepository);
  });

  it('should be able to delete a user by id', async () => {
    const createdUser = await usersRepository.create({
      first_name: 'Lucas',
      last_name: 'Gomes',
      user_name: 'lucassbgomes',
      email: 'lucas.sbgomes@gmail.com',
      password: await hash('123456789', 5),
    });

    await sut.execute({ id: createdUser.id });

    const user = await usersRepository.findById(createdUser.id);

    expect(user).toEqual(null);
  });
});
